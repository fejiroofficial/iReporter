/* eslint linebreak-style: "off" */

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
  const latRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,7})?))$/;
  const longRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,7})?))$/;
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
  let {
    comment, type, latitude, longitude, imageUrl,
  } = req.body;
  comment = comment && comment.toString().trim();
  imageUrl = imageUrl ? imageUrl.toLowerCase().toString().replace(/\s+/g, '') : imageUrl;
  type = type && type.toString().replace(/\s+/g, '');
  latitude = latitude && latitude.toString().trim();
  longitude = longitude && longitude.toString().trim();

  if (!urlRegex.test(imageUrl)) {
    const err = new Error('URL is not valid');
    err.statusCode = 400;
    return next(err);
  }

  if (!comment) {
    const err = new Error('You have to make a comment on this red-flag');
    err.statusCode = 400;
    return next(err);
  }

  if (!latitude) {
    const err = new Error('Please provide the location for this red-flag incident');
    err.statusCode = 400;
    return next(err);
  }

  if (isNaN(latitude)) {
    const err = new Error('latitude co-ordinate should be a number');
    err.statusCode = 400;
    return next(err);
  }

  if (!longitude) {
    const err = new Error('Please provide the location for this red-flag incident');
    err.statusCode = 400;
    return next(err);
  }

  if (isNaN(longitude)) {
    const err = new Error('longitude co-ordinate should be a number');
    err.statusCode = 400;
    return next(err);
  }

  if (!latRegex.test(latitude)) {
    const err = new Error('invalid latitude coordinate provided');
    err.statusCode = 400;
    return next(err);
  }

  if (!longRegex.test(longitude)) {
    const err = new Error('invalid longitude coordinate provided');
    err.statusCode = 400;
    return next(err);
  }

  if (!type) {
    const err = new Error('What is the type of this incident? please provide one');
    err.statusCode = 400;
    return next(err);
  }

  if (type.toLowerCase() !== 'red-flag' && type.toLowerCase() !== 'intervention') {
    const err = new Error('Incidents can only be \'red-flag\' or \'intervention\'');
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

export default validatePostRedFlag;
