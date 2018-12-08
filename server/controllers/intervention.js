/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';

/** incident controller class */
class InterventionController {
  /**
 * @function postIntervention
 * @memberof InterventionController
 * @static
 */
  static postIntervention(req, res) {
    const { userId } = req;
    let { comment, type, latitude, longitude, imageUrl } = req.body;
    comment = comment ? comment.toString().trim().replace(/\s+/g, ' ') : comment;
    type = type ? type.toLowerCase().toString().replace(/\s+/g, '') : type;
    imageUrl = imageUrl ? imageUrl.toLowerCase().toString().replace(/\s+/g, '') : imageUrl;
    latitude = latitude ? latitude.toString().replace(/\s+/g, '') : latitude;
    longitude = longitude ? longitude.toString().replace(/\s+/g, '') : longitude;
    const location = `${latitude},${longitude}`;
    const defaultStatus = 'draft';
    if (type !== 'intervention') {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'This is an intervention incident, the type should be a \'intervention\'',
      });
    }
    return db.incidents.create({ userId, comment, type, location, imageUrl, defaultStatus })
      .then((record) => {
        return res.status(201).json({
          success: 'true',
          data: [{
            id: record.id,
            message: 'You have successfully created a new intervention record',
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
}

export default InterventionController;