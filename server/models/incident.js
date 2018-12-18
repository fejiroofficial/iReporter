/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */

/** Class for interacting with the incidents data table where type is a red-flag. */
export default class Incident {
  /**
  * Class constructor.
  * @param {object} db - Object used to query the database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * create a new red flag or intervention record
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO incidents'
      + '(createdBy, comment, type, location, image_url, status)'
      + 'VALUES(${userId}, ${comment}, ${type}, ${location}, ${image}, ${defaultStatus})'
      + 'RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for finding a redflag or incident record using the id.
  * @param {number} id - the id of a record.
  */

  findById(id) {
    const sql = `SELECT 
     incidents.id, createdby, comment, type, location, image_url, status, createdon,
     firstname, lastname, profile_image, email, telephone
     FROM incidents INNER JOIN users
     ON incidents.createdby = users.id
     WHERE incidents.id = $1 AND type='red-flag'`;
    return this.db.oneOrNone(sql, id);
  }
  /**
  * Method for finding a redflag or incident record using the id.
  * @param {number} id - the id of a record.
  */

  findInterventionById(id) {
    const sql = `SELECT 
     incidents.id, createdby, comment, type, location, image_url, status, createdon,
     firstname, lastname, profile_image, email, telephone
     FROM incidents INNER JOIN users
     ON incidents.createdby = users.id
     WHERE incidents.id = $1 AND type='intervention'`;
    return this.db.oneOrNone(sql, id);
  }
  /** Method for getting all red-flags in the database. */

  allRedFlags(redflag) {
    const sql = `SELECT
     incidents.id, comment, type, location, image_url, status, createdon, firstname, lastname, profile_image
     FROM incidents INNER JOIN users 
     ON incidents.createdby = users.id
     WHERE incidents.type=$1 ORDER BY incidents.createdon DESC`;
    return this.db.many(sql, redflag);
  }
  /** Method for getting user red-flags in the database. */

  someRedFlags(id) {
    const sql = `SELECT
     incidents.id, comment, type, location, image_url, status, createdon, firstname, lastname, profile_image
     FROM incidents INNER JOIN users
     ON incidents.createdby = users.id
     WHERE incidents.type='red-flag' AND incidents.createdby=$1
     ORDER BY incidents.createdon DESC`;
    return this.db.many(sql, id);
  }
  /** Method for getting user interventions in the database. */

  someInterventions(id) {
    const sql = `SELECT
     incidents.id, comment, type, location, image_url, status, createdon, firstname, lastname, profile_image
     FROM incidents INNER JOIN users
     ON incidents.createdby = users.id
     WHERE incidents.type='intervention' AND incidents.createdby=$1
     ORDER BY incidents.createdon DESC`;
    return this.db.many(sql, id);
  }
  /** Method for getting all interventions in the database. */

  allInterventions(intervention) {
    const sql = `SELECT
     incidents.id, comment, type, location, image_url, status, createdon, firstname, lastname, profile_image
     FROM incidents INNER JOIN users ON incidents.createdby = users.id
     WHERE incidents.type=$1 ORDER BY incidents.createdon DESC`;
    return this.db.many(sql, intervention);
  }
  /** Method for getting incident records in the database. */

  allData() {
    const sql = 'SELECT * FROM incidents';
    return this.db.many(sql);
  }
  /**
  * Method for modifying the location of an incident record.
  * @param {number} id - the id of a user.
  */

  modifyLocation(values, id) {
    values.id = id;
    const sql = 'UPDATE incidents SET location=${location} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for modifying the location of an incident record.
  * @param {number} id - the id of a user.
  */

  modifyComment(values, id) {
    values.id = id;
    const sql = 'UPDATE incidents SET comment=${comment} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for modifying the status of an incident record.
  * @param {number} id - the id of a user.
  */

  modifyStatus(values, id) {
    values.id = id;
    const sql = 'UPDATE incidents SET status=${status} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for deleting a redflag or incident record using the id.
  * @param {number} id - the id of a record.
  */

  removeRedFlag(id) {
    const sql = `DELETE FROM incidents
     WHERE id = $1 AND type='red-flag' RETURNING incidents.type`;
    return this.db.one(sql, id);
  }
  /**
  * Method for deleting a redflag or incident record using the id.
  * @param {number} id - the id of a record.
  */

  removeIntervention(id) {
    const sql = `DELETE FROM incidents
   WHERE id = $1 AND type='intervention' RETURNING incidents.type`;
    return this.db.one(sql, id);
  }
}
