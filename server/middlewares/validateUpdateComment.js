/* eslint linebreak-style: "off" */

/**
 * This is a validation for updating red-flag comment
 * @constant
 * 
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 * 
 * @returns {Object}
 *
 * @exports validateUpdateComment
 */

const validateUpdateComment = (req, res, next) => {
  let { comment } = req.body;
  comment = comment && comment.toString().trim();

  if (!comment) {
    const err = new Error('Please provide a brief comment for this red-flag incident');
    err.statusCode = 400;
    return next(err);
  }
  return next();
};
export default validateUpdateComment;
