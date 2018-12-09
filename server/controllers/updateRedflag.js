/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';
import sendEmail from '../helperfn/sendEmail';

/** update red-flgas controller class */
class UpdateRedFlagController {
  /**
  * @function updateComment
  * @memberof UpdateRedFlagController
  * @static
  */
  static updateComment(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const { userId } = req;
    let { comment } = req.body;
    comment = comment ? comment.toString().trim().replace(/\s+/g, ' ') : comment;
    if (isNaN(redFlagId)) {
      return res.status(400).json({
        success: 'false',
        message: 'param should be a number not an alphabet',
      });
    }
    return db.task('find red-flag', data => data.incidents.findById(redFlagId)
      .then((record) => {
        if (!record) {
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'This record doesn\'t exist in the database',
          });
        }
        if (record.type !== 'red-flag') {
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'This incident record is not a red-flag',
          });
        }
        const recordOwner = userId === record.createdby;
        if (!recordOwner) {
          return res.status(401).json({
            status: 401,
            success: 'false',
            message: 'You are unauthorized to update an information that was not posted by you',
          });
        }
        if (record.status !== 'draft') {
          return res.status(403).json({
            status: 403,
            success: 'false',
            message: `This record is marked as ${record.status}. Updating comment is no longer allowed`,
          });
        }
        return db.task('update comment', data => data.incidents.modifyComment({ comment }, redFlagId)
          .then(() => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                id: redFlagId,
                message: 'You have successfully updated the comment of this red-flag record',
              }],
            });
          }));
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, something went wrong, try again',
          err: err.message,
        });
      }));
  }

  /**
* @function updateLocation
* @memberof UpdateRedFlagController
* @static
*/
  static updateLocation(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const { userId } = req;
    console.log(userId);
    let { latitude, longitude } = req.body;
    latitude = latitude ? latitude.toString().replace(/\s+/g, '') : latitude;
    longitude = longitude ? longitude.toString().replace(/\s+/g, '') : longitude;
    const location = `${latitude},${longitude}`;
    if (isNaN(redFlagId)) {
      return res.status(400).json({
        success: 'false',
        message: 'param should be a number not an alphabet',
      });
    }
    return db.task('find red-flag', data => data.incidents.findById(redFlagId)
      .then((record) => {
        if (!record) {
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'This record doesn\'t exist in the database',
          });
        }
        if (record.type !== 'red-flag') {
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'This incident record is not a red-flag',
          });
        }
        const recordOwner = userId === record.createdby;
        if (!recordOwner) {
          return res.status(401).json({
            status: 401,
            success: 'false',
            message: 'You are unauthorized to update an information that was not posted by you',
          });
        }
        if (record.status !== 'draft') {
          return res.status(403).json({
            status: 403,
            success: 'false',
            message: `This record is marked as ${record.status}. Updating location is no longer allowed`,
          });
        }
        return db.task('update location', data => data.incidents.modifyLocation({ location }, redFlagId)
          .then(() => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                id: redFlagId,
                message: 'You have successfully updated the location of this red-flag record',
              }],
            });
          }));
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, something went wrong, try again',
          err: err.message,
        });
      }));
  }

  /**
  * @function updateRedFlagStatus
  * @memberof UpdateRedFlagController
  * @static
  */

  static updateRedFlagStatus(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const { userId } = req;
    let { status } = req.body;
    status = status ? status.toString().replace(/\s+/g, '') : status;

    return db.task('fetch user', data => data.users.findById(userId)
      .then((user) => {
        const notAdmin = user.isadmin === false;
        if (notAdmin) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to update status of a red-flag or intervention record',
          });
        }
        return db.incidents.findById(redFlagId)
          .then((incident) => {
            if (!incident) {
              return res.status(404).json({
                success: 'false',
                message: 'This red-flag or intervention does not exist',
              });
            }
            return db.task('fetch user', data => data.users.findById(incident.createdby)
              .then((user) => {
                const { firstname, email } = user;
                return db.incidents.modifyStatus({ status }, redFlagId)
                  .then(() => {
                    if (status === 'under-investigation') {
                      sendEmail(`${email}`, 'IREPORTER UPDATE', `Hello ${firstname}, the red-flag report you made is now ${status}`);
                    }
                    sendEmail(`${email}`, 'IREPORTER UPDATE', `Hello ${firstname}, the red-flag report you made has been ${status}`);
                    return res.status(200).json({
                      status: 200,
                      success: 'true',
                      data: [{
                        id: redFlagId,
                        message: 'Status updated successfully',
                      }],
                    });
                  });
              }));
          })
          .catch((err) => {
            return res.status(500).json({
              success: 'false',
              message: 'so sorry, something went wrong, try again',
              err: err.message,
            });
          });
      }));
  }
}

export default UpdateRedFlagController;
