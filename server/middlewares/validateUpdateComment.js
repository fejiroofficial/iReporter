/* eslint linebreak-style: "off" */
import ErrorController from '../helpers/error';

/**
 * This is a validation for updating red-flag comment
 * @constant
 *
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 *
 * @returns {Object}
 *
 * @exports validateUpdateComment
 */

const validateUpdateComment = (req, res, next) => {
  let { comment } = req.body;
  comment = comment && comment.toString().trim();
  if (!comment) return next(ErrorController.validationError('Please provide a brief comment for this incident record'));
  return next();
};
export default validateUpdateComment;
