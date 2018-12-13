/* eslint linebreak-style: "off" */

import ErrorController from '../helpers/error';

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
  let { status } = req.body;
  status = status && status.toString().replace(/\s+/g, '');

  if (!status) return next(ErrorController.validationError('Incident status cannot be empty'));

  const wrongStatus = status.toLowerCase()
    !== 'under-investigation' && status.toLowerCase()
    !== 'rejected' && status.toLowerCase() !== 'resolved';
  if (wrongStatus) {
    return next(ErrorController.validationError('you can change the status of a record to either under-investigation, rejected or resolved.'));
  }
  return next();
};

export default validateStatus;
