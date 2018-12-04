/* eslint linebreak-style: "off" */

import validatePostRedFlag from './validatePostRedFlag';
import validateUpdateLocation from './validateUpdateLocation';
import validateUpdateComment from './validateUpdateComment';
import validateParam from './validateParam';

const middlewares = {
  validatePostRedFlag,
  validateUpdateLocation,
  validateUpdateComment,
  validateParam,
};

export default middlewares;
