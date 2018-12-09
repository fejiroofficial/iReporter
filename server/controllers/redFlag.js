/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';

import incidents from '../datastore/incident';

/** incident controller class */
class RedFlagController {
  /**
 * @function getRedFlags
 * @memberof redFlagController
 * @static
 */
  static getRedFlags(req, res) {
    const redFlags = incidents.filter((incident) => {
      if (incident.type === 'red-flag') return incident;
    });

    if (redFlags.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'No red-flags record found',
      });
    }
    return res.status(200).json({
      status: 200,
      success: 'true',
      data: redFlags,
    });
  }

  /**
 * @function getRedFlag
 * @memberof redFlagController
 * @static
 */
  static getRedFlag(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const redFlagFound = incidents.find((incident) => {
      if (incident.type === 'red-flag' && incident.id === redFlagId) {
        return incident;
      }
    });

    if (!redFlagFound) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This red-flag record does not exist',
      });
    }
    return res.status(200).json({
      status: 200,
      success: 'true',
      data: redFlagFound,
    });
  }

  /**
 * @function postRedflag
 * @memberof RedFlagController
 * @static
 */
  static postRedFlag(req, res) {
    const { userId } = req;
    let { comment, type, latitude, longitude, imageUrl } = req.body;
    comment = comment ? comment.toString().trim().replace(/\s+/g, ' ') : comment;
    type = type ? type.toLowerCase().toString().replace(/\s+/g, '') : type;
    imageUrl = imageUrl ? imageUrl.toLowerCase().toString().replace(/\s+/g, '') : imageUrl;
    latitude = latitude ? latitude.toString().replace(/\s+/g, '') : latitude;
    longitude = longitude ? longitude.toString().replace(/\s+/g, '') : longitude;
    const location = `${latitude},${longitude}`;
    const defaultStatus = 'draft';
    if (type !== 'red-flag') {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This is a red-flag incident, the type should be a \'redflag\'',
      });
    }
    return db.incidents.create({ userId, comment, type, location, imageUrl, defaultStatus })
      .then((record) => {
        return res.status(201).json({
          success: 'true',
          data: [{
            id: record.id,
            message: 'You have successfully created a new red-flag record',
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
    const redFlagId = parseInt(req.params.id, 10);
    return db.task('delete', db => db.incidents.findById(redFlagId)
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
            message: 'You are unauthorized to delete an information that was not posted by you',
          });
        }
        return db.incidents.remove(redFlagId)
          .then(() => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                id: redFlagId,
                message: 'You have successfully deleted this red-flag record',
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
      }));
  }
}

export default RedFlagController;
