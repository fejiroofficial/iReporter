/* eslint linebreak-style: "off" */

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

  if (!location) {
    const err = new Error('Please provide the location for this red-flag incident');
    err.statusCode = 400;
    return next(err);
  }
  return next();
};
export default validateUpdateLocation;
