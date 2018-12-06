/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */

import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../db';


/** user controller class */

class UserController {
  /**
 * @function signup
 * @memberof UserController
 * @static
 */
  static signup(req, res) {
    let { firstname, lastname, email, username } = req.body;
    const { password } = req.body;
    firstname = firstname ? firstname.toString().replace(/\s+/g, '') : firstname;
    lastname = lastname ? lastname.toString().replace(/\s+/g, '') : lastname;
    email = email ? email.toString().replace(/\s+/g, '') : email;
    username = username ? username.toString().replace(/\s+/g, '') : username;
    const isAdmin = false;

    return db.task('signup', db => db.users.findByEmail(email)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            success: 'false',
            message: 'user with this email already exists',
          });
        }
        return db.users.findByUsername(username)
          .then((userFound) => {
            if (userFound) {
              return res.status(409).json({
                success: 'false',
                message: 'This username has been taken by someone else',
              });
            }
            return db.users.create({ firstname, lastname, email, username, password, isAdmin })
              .then((user) => {
                const token = jwt.sign({
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  othernames: user.othernames,
                  email: user.email,
                  telephone: user.telephone,
                  username: user.username,
                  profileImage: user.profile_image,
                }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
                return res.status(201).json({
                  success: 'true',
                  message: 'Account created successfully',
                  data: [{
                    token,
                    user,
                  }],
                });
              });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'unable to create user account',
          err: err.message,
        });
      }));
  }
}
export default UserController;
