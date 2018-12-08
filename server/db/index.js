/* eslint no-param-reassign: "off" */
/* eslint linebreak-style: 0 */

import path from 'path';
import Promise from 'bluebird';
import pgp, { QueryFile } from 'pg-promise';
import setup from '../config/config';
import User from '../models/users';
import Incident from '../models/incident';

/** @const sql - generating a full path */

const sql = (file) => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
};

/** @const initoptions pg-promise initialization options  */

const initOptions = {
  promiseLib: Promise,
  extend(obj) {
    obj.users = new User(obj);
    obj.incidents = new Incident(obj);
  },
};

const env = process.env.NODE_ENV || 'development';
const config = setup[env];

let $db;

if (config.use_env_variable) {
  $db = pgp(initOptions)(process.env[config.use_env_variable]);
} else {
  $db = pgp(initOptions)(config);
}

const db = $db;

db
  .query(sql('./iReporter.sql'))
  .then(() => {
    console.log('Database successfully initialized');
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
