/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */

import db from '../db';

/** update intervention controller class */
class UpdateInterventionController {
  /**
  * @function updateComment
  * @memberof UpdateInterventionController
  * @static
  */
  static updateComment(req, res) {
    const interventionId = parseInt(req.params.id, 10);
    const { userId } = req;
    let { comment } = req.body;
    comment = comment ? comment.toString().trim().replace(/\s+/g, ' ') : comment;
    if (isNaN(interventionId)) {
      return res.status(400).json({
        success: 'false',
        message: 'param should be a number not an alphabet',
      });
    }
    return db.task('find red-flag', data => data.incidents.findById(interventionId)
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
          .then(() => {
            return res.status(200).json({
              status: 200,
              success: 'true',
              data: [{
                id: interventionId,
                message: 'You have successfully updated the comment of this intervention record',
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
}

export default UpdateInterventionController;
