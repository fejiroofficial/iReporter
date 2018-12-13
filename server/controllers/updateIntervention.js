/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';
import sendEmail from '../helpers/sendEmail';

/** update intervention controller class */
class UpdateInterventionController {
  /**
  * @function updateComment
  * @memberof UpdateInterventionController
  * @static
  */
  static updateComment(req, res) {
    const interventionId = req.params.id;
    const { userId } = req;
    let { comment } = req.body;
    comment = comment ? comment.toString().trim().replace(/\s+/g, ' ') : comment;
    if (isNaN(interventionId)) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This record doesn\'t exist in the database',
      });
    }
    return db.task('find intervention', data => data.incidents.findInterventionById(interventionId)
      .then((record) => {
        if (!record) {
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'This record doesn\'t exist in the database',
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
        return db.task('update location', data => data.incidents.modifyComment({ comment }, interventionId)
          .then((updated) => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                message: 'You have successfully updated the comment of this intervention record',
                updated,
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
  * @memberof UpdateInterventionController
  * @static
  */
  static updateLocation(req, res) {
    const interventionId = parseInt(req.params.id, 10);
    const { userId } = req;
    let { latitude, longitude } = req.body;
    latitude = latitude ? latitude.toString().replace(/\s+/g, '') : latitude;
    longitude = longitude ? longitude.toString().replace(/\s+/g, '') : longitude;
    const location = `${latitude},${longitude}`;
    if (isNaN(interventionId)) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This record doesn\'t exist in the database',
      });
    }
    return db.task('find intervention', data => data.incidents.findInterventionById(interventionId)
      .then((record) => {
        if (!record) {
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'This record doesn\'t exist in the database',
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
        return db.task('update location', data => data.incidents.modifyLocation({ location }, interventionId)
          .then((updated) => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                message: 'You have successfully updated the location of this intervention record',
                updated,
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
  * @function updateInterventionStatus
  * @memberof UpdateRedFlagController
  * @static
  */
  static updateInterventionStatus(req, res) {
    const interventionId = parseInt(req.params.id, 10);
    const { userId } = req;
    let { status } = req.body;
    status = status ? status.toString().replace(/\s+/g, '') : status;

    if (isNaN(interventionId)) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This record doesn\'t exist in the database',
      });
    }

    return db.task('fetch user', data => data.users.findById(userId)
      .then((user) => {
        const notAdmin = !user.isadmin;
        if (notAdmin) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to update status of a red-flag or intervention record',
          });
        }
        return db.incidents.findInterventionById(interventionId)
          .then((incident) => {
            if (!incident) {
              return res.status(404).json({
                success: 'false',
                message: 'This intervention record does not exist',
              });
            }
            const { firstname, email } = user;
            return db.incidents.modifyStatus({ status }, interventionId)
              .then((updated) => {
                if (status === 'under-investigation') {
                  sendEmail(`${email}`, 'IREPORTER UPDATE', `Hello ${firstname}, the intervention report you made is now ${status}`);
                }
                sendEmail(`${email}`, 'IREPORTER UPDATE', `Hello ${firstname}, the intervention report you made has been ${status}`);
                return res.status(200).json({
                  status: 200,
                  success: 'true',
                  data: [{
                    message: 'Status updated successfully',
                    updated,
                  }],
                });
              });
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

export default UpdateInterventionController;
