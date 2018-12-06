/* eslint linebreak-style: "off" */
/* eslint guard-for-in: "off" */
/* eslint no-restricted-syntax: "off" */
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
  type = type && type.toString().toLowerCase().replace(/\s+/g, '');
  location = location && location
    .toLowerCase().toString().trim().replace(/\s+/g, ' ');

  const requestBody = {
    comment,
    type,
    location,
    images,
    videos,
  };

  const inputData = Object.entries(requestBody);
  const invalidInputData = inputData.find((data) => {
    return data[1] === undefined || data[1] === '';
  });

  if (invalidInputData) return next(ErrorController.validationError(`${invalidInputData[0]} field must not be empty`));
  return next();
};

export default validatePostRedFlag;
