/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */


import ErrorController from '../helperfn/error';


/**
 * This is a validation for user signup
 * @constant
 *
 * @param {String} message - any error message we provide
 *
 * @returns {Object}
 */

/**
 * This is a validation for user signup
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


const validateSignup = (req, res, next) => {
  let {
    firstname, lastname, othernames, email, telephone, username, password,
  } = req.body;
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z0-9]{2,4}$/;
  const userNameRegex = /^[a-z][a-z0-9_]{4,15}$/;
  const nameRegex = /[a-zA-Z]$/;
  email = email && email.toString().trim();
  firstname = firstname && firstname.toString().trim();
  lastname = lastname && lastname.toString().trim();
  username = username && username.toString().trim();
  othernames = othernames && othernames.toString().trim();
  password = password && password.toString();
  telephone = telephone && telephone.toString().replace(/\s+/g, '');

  const requestBody = {
    firstname,
    lastname,
    email,
    username,
    password,
  };

  const inputData = Object.entries(requestBody);
  const noInputData = inputData.find((data) => {
    return data[1] === undefined || data[1] === '';
  });

  if (noInputData) return next(ErrorController.validationError(`${noInputData[0]} field must not be empty`));
  if (!emailRegex.test(email)) return next(ErrorController.validationError('Email is not valid'));
  if (password.length < 6) return next(ErrorController.validationError('Password must be minimum of 6 characters'));

  if (!nameRegex.test(firstname) || !nameRegex.test(lastname) || !nameRegex.test(othernames)) return next(ErrorController.validationError('Name should not contain numbers'));

  if (!nameRegex.test(othernames)) return next(ErrorController.validationError('Namesss should not contain numbers'));

  if (firstname && firstname.length < 3) return next(ErrorController.validationError('firstname must be minimum of 3 characters'));
  if (firstname && firstname.length > 20) return next(ErrorController.validationError('firstname must be maximum of 20 characters'));

  if (lastname && lastname.length < 3) return next(ErrorController.validationError('lastname must be minimum of 3 characters'));
  if (lastname && lastname.length > 20) return next(ErrorController.validationError('lastname must be maximum of 20 characters'));

  if (!userNameRegex.test(username)) return next(ErrorController.validationError('Invalid username'));

  if (telephone && isNaN(telephone)) return next(ErrorController.validationError('telephone number should not contain an alphabet'));
  if (telephone && telephone.length > 11) return next(ErrorController.validationError('telephone number should not be greater than 11 characters'));
  if (telephone && telephone.length < 11) return next(ErrorController.validationError('telephone number should not be less than 11 characters'));

  return next();
};

export default validateSignup;
