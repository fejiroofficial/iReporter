/* eslint linebreak-style: "off" */
/* eslint no-plusplus: "off" */
/* eslint no-restricted-globals: "off" */
/* eslint no-param-reassign: "off" */

import incidents from '../datastore/incident';

/** incident controller class */
class redFlagController {
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
 * @function postRedFlag
 * @memberof redFlagController
 * @static
 */
  static postRedFlag(req, res) {
    let {
      comment, type, location, images, videos,
    } = req.body;
    comment = comment && comment.toString().replace(/\s+/g, ' ');
    type = type && type.toString().toLowerCase().replace(/\s+/g, '');
    const createdOn = new Date().toISOString();
    const id = incidents.length + 1;
    const status = 'draft';
    if (type !== 'red-flag') {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This is a red-flag incident, the type should be a \'red-flag\'',
      });
    }
    const newRedFlag = {
      id,
      createdOn,
      type,
      location,
      status,
      images,
      videos,
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

  /**
 * @function deleteRedFlag
 * @memberof redFlagController
 * @static
 */
  static deleteRedFlag(req, res) {
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
    const redFlagindex = incidents.indexOf(redFlagFound);
    incidents.splice(redFlagindex, 1);
    return res.status(200).json({
      status: 200,
      success: 'true',
      data: [{
        id: redFlagFound.id,
        message: 'red-flag record has been deleted',
      }],
    });
  }
}

export default redFlagController;
