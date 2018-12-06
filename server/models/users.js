/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: 0 */

import bcrypt from 'bcrypt-nodejs';
/** Class for interacting with the user data table. */
export default class User {
  /**
  * Class constructor.
  * @param {object} db - Object used to query database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * Create a new user.
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const salt = bcrypt.genSaltSync(10);
    values.password = bcrypt.hashSync(values.password, salt);
    const sql = 'INSERT INTO users(firstname, lastname, othernames, email, telephone, username, profile_image, password, isAdmin) VAlUES( ${firstname}, ${lastname}, ${othernames}, ${email}, ${telephone}, ${username}, ${profileImage}, ${password}, ${isAdmin}) RETURNING id, firstname, lastname, othernames,email, telephone, username, profile_image, registered';
    return this.db.one(sql, values);
  }
  /**
* Create a new user with telephone.
* @param {object} values - values gotten from the body of a request.
*/

  createUser(values) {
    const salt = bcrypt.genSaltSync(10);
    values.password = bcrypt.hashSync(values.password, salt);
    const sql = 'INSERT INTO users(firstname, lastname, email, password, admin_user) VAlUES( ${firstname}, ${lastname}, ${email}, ${password}, ${adminUser}) RETURNING id, firstname, lastname, email, telephone, admin_user';
    return this.db.one(sql, values);
  }
  /**
  * Method for finding a user using the id.
  * @param {number} id - the id of a user.
  */

  findById(id) {
    const sql = 'SELECT * FROM users WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }
  /**
* Method for finding a user using the username.
* @param {number} id - the id of a user.
*/

  findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = $1';
    return this.db.oneOrNone(sql, username);
  }
  /**
  * Method for finding a user using the email address.
  * @param {String} email - the email of a user.
  */

  findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return this.db.oneOrNone(sql, email);
  }
  /**
  * Method for finding a user using the telephone number.
  * @param {String} telephone - the telephone number of a user.
  */

  findByTelephone(telephone) {
    const sql = 'SELECT * FROM users WHERE telephone = $1';
    return this.db.oneOrNone(sql, telephone);
  }
  /**
  * Method for removing a user from the database using the id.
  * @param {number} id - the id of a user.
  */

  remove(id) {
    const sql = 'DELETE FROM users WHERE id = $1';
    return this.db.one(sql, id);
  }
  /**
  * Method for modifying user information.
  * @param {number} id - the id of a user.
  */

  modify(values, id) {
    values.id = id;
    const sql = 'UPDATE users SET firstname=${firstname}, lastname=${lastname}, email=${email}, telephone=${telephone} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
}
