/* eslint linebreak-style: "off" */

import validateSignup from './validateSignup';
import validatePostRedFlag from './validatePostRedFlag';
import validateUpdateLocation from './validateUpdateLocation';
import validateUpdateComment from './validateUpdateComment';
import validateParam from './validateParam';

const middlewares = {
  validateSignup,
  validatePostRedFlag,
  validateUpdateLocation,
  validateUpdateComment,
  validateParam,
};

export default middlewares;
