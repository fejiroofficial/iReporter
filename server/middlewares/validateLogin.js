/* eslint no-trailing-spaces: "off" */

/**
 * This is a validation for user login
 * @constant
 * 
 * @param {String} message - any error message we provide
 * 
 * @returns {Object}
 */


import ErrorController from '../helperfn/error';
/**
 * This is a validation for user login
 * @constant
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 * 
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validateLogin
 */

const validateLogin = (req, res, next) => {
  let { email, password } = req.body;
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
  const userNameRegex = /^[a-z][a-z0-9_]{5,15}$/;
  email = email && email.toString().trim();
  password = password && password.toString();

  if (!email && !password) return next(ErrorController.validationError('Email and Password are required'));
  if (!email) return next(ErrorController.validationError('Email is required'));
  if (!password) return next(ErrorController.validationError('Password is required'));

  if (email.includes('@') && !emailRegex.test(email)) return next(ErrorController.validationError('Email is not valid'));
  if (!email.includes('@') && !userNameRegex.test(email)) return next(ErrorController.validationError('Username is not valid'));
  if (password.trim() === '') return next(ErrorController.validationError('Password cannot be empty'));
  if (password.length < 6) return next(ErrorController.validationError('Password must be minimum of 6 characters'));

  return next();
};

export default validateLogin;
