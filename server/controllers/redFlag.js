/* eslint linebreak-style: "off" */
/* eslint no-restricted-globals: "off" */


import incidents from '../datastore/incident';
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
}
export default redFlagController;
