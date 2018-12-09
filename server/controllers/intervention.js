/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint indent: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';

/** incident controller class */
class InterventionController {
  /**
* @function getInterventions
* @memberof InterventionController
* @static
*/
  static getInterventions(req, res) {
    const { isAdmin, userId } = req;
    const adminUser = isAdmin === true;
    switch (adminUser) {
      case true:
        db.task('all interventions', data => data.incidents.allInterventions('intervention')
          .then((interventions) => {
            if (interventions.length === 0) {
              return res.status(404).json({
                status: 404,
                success: 'false',
                message: 'No intervention record found',
              });
            }
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: interventions,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: 'false',
              err: err.message,
            });
          }));
        break;

      case false:
        db.task('all interventions', data => data.incidents.someInterventions(userId)
          .then((interventions) => {
            if (interventions.length === 0) {
              return res.status(404).json({
                status: 404,
                success: 'false',
                message: 'No intervention record found',
              });
            }
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: interventions,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: 'false',
              err: err.message,
            });
          }));
        break;

      default:
        return res.status(500).json({
          success: 'false',
          message: 'unable to login, try again!',
        });
    }
  }
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

  /**
  * @function deleteIntervention
  * @memberof InterventionController
  * @static
  */
  static deleteIntervention(req, res) {
    const { userId } = req;
    const interventionId = parseInt(req.params.id, 10);
    return db.task('delete', db => db.incidents.findById(interventionId)
      .then((record) => {
        if (!record) {
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'This record doesn\'t exist in the database',
          });
        }
        if (record.type !== 'intervention') {
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'This incident record is not an intervention',
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
        return db.incidents.remove(interventionId)
          .then(() => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                id: interventionId,
                message: 'You have successfully deleted this intervention record',
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

export default InterventionController;
