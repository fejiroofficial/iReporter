/* eslint linebreak-style: "off" */


/** error controller class */
class ErrorController {
  /**
 * @function validationError
 * @memberof ErrorController
 * @static
 */
  static validationError(message) {
    const err = Error(message);
    err.statusCode = 400;
    return err;
  }

  /**
* @function routeError
* @memberof ErrorController
* @static
*/
  static routeError(req, res) {
    if (!req.route) {
      return res.status(404).json({
        status: 404,
        success: 'false',
        message: 'This route does not exist',
      });
    }
  }
}

export default ErrorController;
