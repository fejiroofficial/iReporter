/* eslint linebreak-style: "off" */
import ErrorController from '../helpers/error';

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
  const id = req.params.id;
  const latRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,7})?))$/;
  const longRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,7})?))$/;
  let { latitude, longitude } = req.body;
  latitude = latitude && latitude.toString().trim();
  longitude = longitude && longitude.toString().trim();

  if (isNaN(id)) return next(ErrorController.validationError('param should be a number not an alphabet'));
  if (!latitude) return next(ErrorController.validationError('Please provide the location(latitude) for this incident'));
  if (!longitude) return next(ErrorController.validationError('Please provide the location(longitude) for this incident'));
  if (isNaN(latitude)) return next(ErrorController.validationError('latitude co-ordinate should be a number'));
  if (isNaN(longitude)) return next(ErrorController.validationError('longitude co-ordinate should be a number'));
  if (!latRegex.test(latitude)) return next(ErrorController.validationError('invalid latitude coordinate provided'));
  if (!longRegex.test(longitude)) return next(ErrorController.validationError('invalid longitude coordinate provided'));
  return next();
};
export default validateUpdateLocation;
