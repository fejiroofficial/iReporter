/* eslint linebreak-style: "off" */
import ErrorController from '../helperfn/error';

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
    comment, type, location, images, videos,
  } = req.body;
  comment = comment && comment.toString().trim();
  type = type && type.toString().replace(/\s+/g, '');
  location = location && location
    .toLowerCase().toString().trim().replace(/\s+/g, ' ');

  if (!comment) return next(ErrorController.validationError('You have to make a comment on this red-flag'));
  if (!location) return next(ErrorController.validationError('Please provide the location for this red-flag incident'));
  if (!images || !videos) return next(ErrorController.validationError('Please provide an image or video evidence for this report'));
  if (!type) return next(ErrorController.validationError('What is the type of this incident? please provide one'));
  if (type.toLowerCase() !== 'red-flag' && type.toLowerCase() !== 'intervention') {
    return next(ErrorController.validationError('Incidents can only be \'red-flag\' or \'intervention\''));
  }

  return next();
};

export default validatePostRedFlag;
