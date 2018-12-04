/* eslint linebreak-style: "off" */
/* eslint no-plusplus: "off" */
/* eslint no-restricted-globals: "off" */
/* eslint no-param-reassign: "off" */

import incidents from '../datastore/incident';

/** update red-flgas controller class */
class UpdateRedFlagController {
  /**
 * @function updateLocation
 * @memberof UpdateRedFlagController
 * @static
 */
  static updateLocation(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    let { location } = req.body;
    location = location && location
      .toLowerCase().toString().trim().replace(/\s+/g, ' ');
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
    redFlagFound.location = location;
    return res.status(200).json({
      status: 200,
      success: 'true',
      data: [{
        id: redFlagFound.id,
        message: 'Updated red-flag record’s location',
      }],
    });
  }

  /**
* @function updateComment
* @memberof UpdateRedFlagController
* @static
*/
  static updateComment(req, res) {
    const redFlagId = parseInt(req.params.id, 10);
    let { comment } = req.body;
    comment = comment && comment
      .toLowerCase().toString().trim().replace(/\s+/g, ' ');
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
    redFlagFound.comment = comment;
    return res.status(200).json({
      status: 200,
      success: 'true',
      data: [{
        id: redFlagFound.id,
        message: 'Updated red-flag record’s comment',
      }],
    });
  }
}

export default UpdateRedFlagController;
