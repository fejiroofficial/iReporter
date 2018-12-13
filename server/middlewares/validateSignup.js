/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */

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
  const emailRegex =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const userNameRegex = /^[a-z][a-z0-9_]{4,15}$/;
  const nameRegex = /^[a-zA-Z]+$/;
  email = email && email.toString().trim();
  firstname = firstname && firstname.toString().trim();
  lastname = lastname && lastname.toString().trim();
  username = username && username.toString().toLowerCase().trim();
  othernames = othernames && othernames.toString().trim();
  password = password && password.toString();
  telephone = telephone && telephone.toString().replace(/\s+/g, '');

  const errors = {};

  const requestBody = {
    firstname,
    lastname,
    email,
    username,
    telephone,
    password,
  };

  const inputData = Object.entries(requestBody);
  const noInputData = inputData.find((data) => {
    return data[1] === undefined || data[1] === '';
  });

  if (noInputData) errors.emptyField = `${noInputData[0]} field must not be empty`;
  if (!emailRegex.test(email)) errors.invalidEmail = 'Email is not valid';
  if (password.length < 6) errors.password = 'Password must be minimum of 6 characters';
  if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) errors.badName = 'Names should not contain numbers and special characters';
  if (othernames && !nameRegex.test(othernames)) errors.badName = 'Names should not contain numbers and special characters';
  if (firstname && firstname.length < 3) errors.firstName = 'firstname must be minimum of 3 characters';
  if (firstname && firstname.length > 20) errors.firstname = 'firstname must be maximum of 20 characters';
  if (lastname && lastname.length < 3) errors.firstName = 'lastname must be minimum of 3 characters';
  if (lastname && lastname.length > 20) errors.firstname = 'lastname must be maximum of 20 characters';
  if (!userNameRegex.test(username)) errors.username = 'Invalid username';
  if (telephone && isNaN(telephone)) errors.telephone = 'telephone number should not contain alphabets and special characters';
  if (telephone && telephone.length > 11) errors.telephone = 'telephone number should not be greater than 11 characters';
  if (telephone && telephone.length < 11) errors.telephone = 'telephone number should not be less than 11 characters';

  if (Object.getOwnPropertyNames(errors).length) {
    return res.status(400).json({
      status: 400,
      success: 'false',
      errors,
    });
  }

  return next();
};

export default validateSignup;
