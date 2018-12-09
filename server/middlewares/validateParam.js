/* eslint linebreak-style: "off" */
import ErrorController from '../helperfn/error';

/**
 * This is a validation for param
 * @constant
 *
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 *
 * @returns {Object}
 *
 * @exports validateParam
 */

const validateParam = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return next(ErrorController.validationError('hooops! params should be a number e.g 1'));
  return next();
};
export default validateParam;
