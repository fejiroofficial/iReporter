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
    comment, type, location, Images, Videos,
  } = req.body;
  let createdBy = parseInt(req.body.createdBy, 10);

  comment = comment && comment.toString().trim();
  type = type && type.toString().replace(/\s+/g, '');
  createdBy = createdBy && createdBy.toString().trim();


  if (isNaN(createdBy)) {
    const err = new Error('createdBy should be a number');
    err.statusCode = 400;
    return next(err);
  }

  if (!comment) {
    const err = new Error('You have to make a comment on this red-flag');
    err.statusCode = 400;
    return next(err);
  }

  if (!createdBy) {
    const err = new Error('unauthorized user, please provide your id');
    err.statusCode = 401;
    return next(err);
  }

  if (!location) {
    const err = new Error('Please provide the location for this red-flag incident');
    err.statusCode = 400;
    return next(err);
  }


  if (!Images || !Videos) {
    const err = new Error('Please provide an image or video evidence for this report');
    err.statusCode = 400;
    return next(err);
  }

  if (!type) {
    const err = new Error('What is the type of this incident? please provide one');
    err.statusCode = 400;
    return next(err);
  }

  if (type !== 'red-flag' && type !== 'intervention') {
    const err = new Error('Incidents can only be \'red-flag\' or \'intervention\'');
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

export default validatePostRedFlag;
