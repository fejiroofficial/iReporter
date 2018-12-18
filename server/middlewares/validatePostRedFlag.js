/* eslint linebreak-style: "off" */


const latRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,16})?))$/;
const longRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,16})?))$/;
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

/**
 * This is a validation for post red-flag
 * @constant
 * 
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 * 
 * @returns {Object}
 *
 * @exports validatePostRedFlag
 */
const validatePostRedFlag = (req, res, next) => {
  let {
    comment, latitude, longitude, image,
  } = req.body;
  comment = comment && comment.toString().trim();
  image = image ? image.toLowerCase().toString().replace(/\s+/g, '') : image;
  latitude = latitude && latitude.toString().trim();
  longitude = longitude && longitude.toString().trim();

  const errors = {};

  if (!comment) errors.comment = 'You have to make a comment on this incident record';
  if (!latitude) errors.latitude = 'Please provide the location(latitude) for this incident';
  if (isNaN(latitude)) errors.latitudeNumber = 'latitude co-ordinate should be a number';
  if (!latRegex.test(latitude)) errors.latitudeCordinate = 'invalid latitude coordinate provided';
  if (!longitude) errors.longitude = 'Please provide the location(longitude) for this incident';
  if (isNaN(longitude)) errors.longitudeNumber = 'longitude co-ordinate should be a number';
  if (!longRegex.test(longitude)) errors.longitudeCordinate = 'invalid longitude coordinate provided';
  if (image && !urlRegex.test(image)) errors.image = 'image URL is not valid';

  if (Object.getOwnPropertyNames(errors).length) {
    return res.status(400).json({
      status: 400,
      success: 'false',
      errors,
    });
  }

  return next();
};

export default validatePostRedFlag;
