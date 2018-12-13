/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint indent: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';
import isInteger from '../helpers/param';

/** incident controller class */
class RedFlagController {
  /**
  * @function getRedFlag
  * @memberof RedFlagController
  * @static
  */
  static getRedFlag(req, res) {
    const redFlagId = req.params.id;
    if (isNaN(redFlagId) || !isInteger(redFlagId)) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This record doesn\'t exist in the database',
      });
    }
    return db.task('specific red flag', data => data.incidents.findById(redFlagId)
      .then((record) => {
        if (!record) {
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'This record doesn\'t exist in the database',
          });
        }
        return res.status(200).json({
          status: 200,
          success: 'true',
          data: record,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: 'false',
          err: err.message,
        });
      }));
  }

  /**
  * @function getRedFlags
  * @memberof RedFlagController
  * @static
  */
  static getRedFlags(req, res) {
    const { isAdmin, userId } = req;
    const adminUser = isAdmin === true;
    switch (adminUser) {
      case true:
        db.task('all red flags', data => data.incidents.allRedFlags('red-flag')
          .then((redFlags) => {
            if (redFlags) {
              return res.status(200).json({
                status: 200,
                success: 'true',
                data: redFlags,
              });
            }
          })
          .catch((err) => {
            if (err.message === 'No data returned from the query.') {
              return res.status(200).json({
                status: 200,
                success: 'true',
                data: [],
              });
            }
            res.status(500).json({
              success: 'false',
              err: err.message,
            });
          }));
        break;

      case false:
        db.task('all red flags', data => data.incidents.someRedFlags(userId)
          .then((redFlags) => {
            if (redFlags) {
              return res.status(200).json({
                status: 200,
                success: 'true',
                data: redFlags,
              });
            }
          })
          .catch((err) => {
            if (err.message === 'No data returned from the query.') {
              return res.status(200).json({
                status: 200,
                success: 'true',
                data: [],
              });
            }
            res.status(500).json({
              success: 'false',
              err: err.message,
            });
          }));
        break;

      default:
        return res.status(500).json({
          success: 'false',
          message: 'Something went wrong, try again later!',
        });
    }
  }

  /**
 * @function postRedflag
 * @memberof RedFlagController
 * @static
 */
  static postRedFlag(req, res) {
    const { userId } = req;
    let { comment, latitude, longitude, image } = req.body;
    comment = comment ? comment.toString().trim().replace(/\s+/g, ' ') : comment;
    image = image ? image.toLowerCase().toString().replace(/\s+/g, '') : image;
    latitude = latitude ? latitude.toString().replace(/\s+/g, '') : latitude;
    longitude = longitude ? longitude.toString().replace(/\s+/g, '') : longitude;
    const location = `${latitude},${longitude}`;
    const defaultStatus = 'draft';
    const type = 'red-flag';
    return db.incidents.create({ userId, comment, type, location, image, defaultStatus })
      .then((record) => {
        return res.status(201).json({
          success: 'true',
          data: [{
            message: 'You have successfully created a new red-flag record',
            record,
          }],
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, something went wrong, try again',
          err: err.message,
        });
      });
  }

  /**
 * @function deleteRedFlag
 * @memberof redFlagController
 * @static
 */
  static deleteRedFlag(req, res) {
    const { userId } = req;
    const redFlagId = req.params.id;
    if (isNaN(redFlagId)) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This record doesn\'t exist in the database',
      });
    }
    return db.task('delete', db => db.incidents.findById(redFlagId)
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
            message: 'You are unauthorized to delete an information that was not posted by you',
          });
        }
        return db.incidents.removeRedFlag(redFlagId)
          .then((removed) => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                message: 'You have successfully deleted this red-flag record',
                removed,
              }],
            });
          })
          .catch((err) => {
            if (err.message === 'No data returned from the query.') {
              return res.status(422).json({
                status: 422,
                success: 'false',
                message: 'You are attempting to delete a resource with the wrong route',
              });
            }
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, something went wrong, try again',
          err: err.message,
        });
      }));
  }
}

export default RedFlagController;
