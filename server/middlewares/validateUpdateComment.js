/* eslint linebreak-style: "off" */
import ErrorController from '../helperfn/error';

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
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return next(ErrorController.validationError('hooops! params should be a number e.g 1'));
  if (!comment) return next(ErrorController.validationError('Please provide a brief comment for this incident record'));
  return next();
};
export default validateUpdateComment;
