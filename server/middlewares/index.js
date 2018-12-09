/* eslint linebreak-style: "off" */

import validateSignup from './validateSignup';
import validatePostRedFlag from './validatePostRedFlag';
import validateUpdateLocation from './validateUpdateLocation';
import validateUpdateComment from './validateUpdateComment';
import validateStatus from './validateUpdateStatus';
import validateLogin from './validateLogin';
import verifyToken from './verifyToken';

const middlewares = {
  validateSignup,
  validatePostRedFlag,
  validateUpdateLocation,
  validateUpdateComment,
  validateStatus,
  validateLogin,
  verifyToken,
};

export default middlewares;
