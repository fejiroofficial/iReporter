/* eslint linebreak-style: "off" */

import validatePostRedFlag from './validatePostRedFlag';
import validateUpdateLocation from './validateUpdateLocation';
import validateUpdateComment from './validateUpdateComment';

const middlewares = {
  validatePostRedFlag,
  validateUpdateLocation,
  validateUpdateComment,
};

export default middlewares;
