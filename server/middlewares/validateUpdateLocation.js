/* eslint linebreak-style: "off" */
import ErrorController from '../helperfn/error';

/**
 * This is a validation for updating red-flag location
 * @constant
 *
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 *
 * @returns {Object}
 *
 * @exports validateUpdateLocation
 */

const validateUpdateLocation = (req, res, next) => {
  const { location } = req.body;
  const redFlagId = parseInt(req.params.id, 10);
  if (isNaN(redFlagId)) return next(ErrorController.validationError('hooops! params should be a number e.g 1'));
  if (!location) return next(ErrorController.validationError('Please provide the location for this red-flag incident'));
  return next();
};
export default validateUpdateLocation;
