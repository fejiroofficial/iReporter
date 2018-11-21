/* eslint linebreak-style: "off" */
/* eslint no-plusplus: "off" */
/* eslint no-restricted-globals: "off" */
/* eslint no-param-reassign: "off" */

import incidents from '../datastore/incident';
import users from '../datastore/users';

/** incident controller class */
class redFlagController {
  /**
 * @function getRedFlags
 * @memberof redFlagController
 * @static
 */
  static getRedFlags(req, res) {
    const redFlags = [];
    incidents.forEach((incident) => {
      if (incident.type === 'red-flag') {
        redFlags.push(incident);
      }
    });
    if (redFlags.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'No red-flag record found',
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
    const redFlags = [];
    const data = [];
    if (isNaN(redFlagId)) {
      return res.status(400).json({
        success: 'false',
        message: 'hooops! params should be a number e.g 1',
      });
    }
    incidents.forEach((incident) => {
      if (incident.type === 'red-flag') {
        redFlags.push(incident);
      }
    });
    if (redFlags.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'No red-flag record found',
      });
    }
    redFlags.forEach((redFlag) => {
      if (redFlag.id === redFlagId) {
        data.push(redFlag);
      }
    });
    if (data.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This red-flag record does not exist',
      });
    }
    return res.status(200).json({
      status: 200,
      success: 'true',
      data,
    });
  }

  /**
 * @function postRedFlag
 * @memberof redFlagController
 * @static
 */
  static postRedFlag(req, res) {
    let {
      comment, type, location, Images, Videos,
    } = req.body;
    comment = comment && comment.toString().replace(/\s+/g, ' ');
    const createdBy = parseInt(req.body.createdBy, 10);
    const createdOn = new Date().toISOString();
    const id = incidents.length + 1;
    const status = 'draft';
    if (type !== 'red-flag') {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This is a red-flag incident, the type should be a \'redflag\'',
      });
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === createdBy) {
        const newRedFlag = {
          id,
          createdOn,
          createdBy,
          type,
          location,
          status,
          Images,
          Videos,
          comment,
        };
        incidents.push(newRedFlag);
        return res.status(201).json({
          status: 201,
          success: 'true',
          data: [{
            id: newRedFlag.id,
            message: 'Created red-flag record',
          }],
        });
      }
      if (users[i].id !== createdBy) {
        return res.status(401).json({
          status: 401,
          success: 'false',
          message: 'unauthorized user, please sign up',
        });
      }
    }
    return incidents;
  }

  /**
 * @function updateLocation
 * @memberof redFlagController
 * @static
 */
  static updateLocation(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const userId = parseInt(req.body.userId, 10);
    const redFlags = [];
    const data = [];
    const dataObject = {};
    let { location } = req.body;
    location = location && location
      .toLowerCase().toString().trim().replace(/\s+/g, ' ');
    if (isNaN(redFlagId)) {
      return res.status(400).json({
        success: 'false',
        message: 'hooops! params should be a number e.g 1',
      });
    }
    incidents.forEach((incident) => {
      if (incident.type === 'red-flag') {
        redFlags.push(incident);
      }
    });
    if (redFlags.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'No red-flag record found',
      });
    }
    redFlags.forEach((redFlag) => {
      if (redFlag.id === redFlagId && redFlag.createdBy === userId) {
        redFlag.location = location;
        dataObject.id = redFlag.id;
        dataObject.updatedBy = redFlag.createdBy;
        dataObject.message = 'Updated red-flag record’s location';
      }
    });
    if (Object.keys(dataObject).length === 0) {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This red-flag record either does not exist or does not belong to you',
      });
    }
    data.push(dataObject);
    return res.status(201).json({
      status: 201,
      success: 'true',
      data,
    });
  }

  /**
* @function updateComment
* @memberof redFlagController
* @static
*/
  static updateComment(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const userId = parseInt(req.body.userId, 10);
    const redFlags = [];
    const data = [];
    const dataObject = {};
    let { comment } = req.body;
    comment = comment && comment
      .toLowerCase().toString().trim().replace(/\s+/g, ' ');
    if (isNaN(redFlagId)) {
      return res.status(400).json({
        success: 'false',
        message: 'hooops! params should be a number e.g 1',
      });
    }
    incidents.forEach((incident) => {
      if (incident.type === 'red-flag') {
        redFlags.push(incident);
      }
    });
    if (redFlags.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'No red-flag record found',
      });
    }
    redFlags.forEach((redFlag) => {
      if (redFlag.id === redFlagId && redFlag.createdBy === userId) {
        redFlag.comment = comment;
        dataObject.id = redFlag.id;
        dataObject.updatedBy = redFlag.createdBy;
        dataObject.message = 'Updated red-flag record’s comment';
      }
    });
    if (Object.keys(dataObject).length === 0) {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This red-flag record either does not exist or does not belong to you',
      });
    }
    data.push(dataObject);
    return res.status(201).json({
      status: 201,
      success: 'true',
      data,
    });
  }

  /**
 * @function deleteRedFlag
 * @memberof redFlagController
 * @static
 */
  static deleteRedFlag(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    const userId = parseInt(req.body.userId, 10);
    const redFlags = [];
    const data = [];
    const dataObject = {};
    if (!userId || isNaN(userId)) {
      return res.status(401).json({
        success: 'false',
        message: 'unauthorized user, please provide a valid user id',
      });
    }

    if (isNaN(redFlagId)) {
      return res.status(400).json({
        success: 'false',
        message: 'hooops! params should be a number e.g 1',
      });
    }

    incidents.forEach((incident) => {
      if (incident.type === 'red-flag') {
        redFlags.push(incident);
      }
    });

    if (redFlags.length === 0) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'No red-flag record found',
      });
    }

    redFlags.forEach((redFlag) => {
      if (redFlag.id === redFlagId && redFlag.createdBy === userId) {
        const redFlagindex = redFlags.indexOf(redFlag);
        redFlags.splice(redFlagindex, 1);
        dataObject.id = redFlag.id;
        dataObject.deletedBy = redFlag.createdBy;
        dataObject.message = 'red-flag record has been deleted';
      }
    });

    if (Object.keys(dataObject).length === 0) {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This red-flag record either does not exist or does not belong to you',
      });
    }
    data.push(dataObject);
    return res.status(200).json({
      status: 200,
      success: 'true',
      data,
    });
  }
}

export default redFlagController;
