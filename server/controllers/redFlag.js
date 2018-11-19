import incidents from '../datastore/incident';
/** incident controller class */

class redFlagController {
  /**
 * @function getRedFlags
 * @memberof incidentController
 * @static
 */
  static getRedFlags(req, res) {
    const redFlags = [];
    incidents.forEach((redFlag) => {
      if (redFlag.type === 'red-flag') {
        redFlags.push(redFlag);
      }
    });
    return res.status(200).json({
      status: 200,
      success: 'true',
      data: redFlags,
    });
  }
}
export default redFlagController;
