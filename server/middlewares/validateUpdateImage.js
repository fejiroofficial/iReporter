/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */

import ErrorController from '../helpers/error';

/**
 * This is a validation for updating user profile image
 * @constant
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 *
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validateSignup
 */


const validateUpdateImage = (req, res, next) => {
  const id = req.params.id;
  let {
    profileImage,
  } = req.body;
  
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
  profileImage = profileImage && profileImage.toString().replace(/\s+/g, '');

  if (isNaN(id)) return next(ErrorController.validationError('param should be a number not an alphabet'));
  if (!profileImage) return next(ErrorController.validationError('Please provide a link to image'));
  if (!urlRegex.test(profileImage)) return next(ErrorController.validationError('invalid image url link'));
  return next();
};

export default validateUpdateImage;
