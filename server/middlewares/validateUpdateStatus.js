/* eslint linebreak-style: "off" */

import ErrorController from '../helperfn/error';

/**
 * This is a validation for update red-flag or intervention status
 * @constant
 * 
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 * 
 * @returns {Object}
 *
 * @exports validateComment
 */

const validateStatus = (req, res, next) => {
  const id = req.params.id;
  let { status } = req.body;
  status = status && status.toString().replace(/\s+/g, '');

  const wrongStatus = status.toLowerCase() !== 'under-investigation' && status.toLowerCase() !== 'rejected' && status.toLowerCase() !== 'resolved';

  if (isNaN(id)) return next(ErrorController.validationError('param should be a number not an alphabet'));
  if (!status) return next(ErrorController.validationError('Incident status cannot be empty'));
  if (wrongStatus) return next(ErrorController.validationError('you can change the status of a record to either under-investigation, rejected or resolved.'));
  return next();
};

export default validateStatus;
