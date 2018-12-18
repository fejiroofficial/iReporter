/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint indent: "off" */

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
  let { firstname, lastname, othernames, email, telephone, username } = req.body;
  const { password } = req.body;
  firstname = firstname ? firstname.toString().replace(/\s+/g, '') : firstname;
  lastname = lastname ? lastname.toString().replace(/\s+/g, '') : lastname;
  othernames = othernames ? othernames.toString().replace(/\s+/g, '') : othernames;
  email = email ? email.toString().replace(/\s+/g, '') : email;
  telephone = telephone ? telephone.toString().replace(/\s+/g, '') : telephone;
  username = username ? username.toString().toLowerCase().replace(/\s+/g, '') : username;
  const isAdmin = false;
  const profileImage = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png';

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
          return db.users.findByTelephone(telephone)
            .then((found) => {
              if (found) {
                return res.status(409).json({
                  success: 'false',
                  message: 'user with this telephone already exists',
                });
              }
              return db.users.create({ firstname, lastname, othernames, email, telephone, username, profileImage, password, isAdmin })
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
                    isAdmin: user.isadmin,
                  }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
                  return res.status(201).json({
                    success: 'true',
                    message: 'Account created successfully',
                    token,
                  });
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
  /**
* @function login
* @memberof UserController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static login(req, res) {
    let { email } = req.body;
    const { password } = req.body;
    email = email && email.toString().trim();

    const correctMail = email.includes('@');

    switch (correctMail) {
      case true:
        db.task('signin', data => data.users.findByEmail(email)
          .then((user) => {
            if (!user) {
              return res.status(401).json({
                success: 'false',
                message: 'You have entered an invalid email or password',
              });
            }
            const allowEntry = bcrypt.compareSync(password, user.password);
            if (!allowEntry) {
              return res.status(401).json({
                success: 'false',
                message: 'You have entered an invalid email or password',
              });
            }
            const token = jwt.sign({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              othernames: user.othernames,
              email: user.email,
              telephone: user.telephone,
              username: user.username,
              profileImage: user.profile_image,
              isAdmin: user.isadmin,
            }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
            return res.status(200).json({
              success: 'true',
              message: 'Login was successful',
              token,
            });
          }));
        break;

      case false:
        db.task('signin', data => data.users.findByUsername(email)
          .then((user) => {
            if (!user) {
              return res.status(401).json({
                success: 'false',
                message: 'You have entered an invalid username or password',
              });
            }
            const allowEntry = bcrypt.compareSync(password, user.password);
            if (!allowEntry) {
              return res.status(401).json({
                success: 'false',
                message: 'You have entered an invalid username or password',
              });
            }
            const token = jwt.sign({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              othernames: user.othernames,
              email: user.email,
              telephone: user.telephone,
              username: user.username,
              profileImage: user.profile_image,
              isAdmin: user.isadmin,
            }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
            return res.status(200).json({
              success: 'true',
              message: 'Login was successful',
              token,
            });
          }));
        break;

      default:
        return res.status(500).json({
          success: 'false',
          message: 'unable to login, try again!',
        });
    }
  }

    /**
* @function updateUser
* @memberof UserController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

static updateUserImage(req, res) {
  const { userId } = req;
  const id = parseInt(req.params.id, 10);
  let { profileImage } = req.body;
  profileImage = profileImage ? profileImage.toString().replace(/\s+/g, '') : profileImage;


  return db.task('find user', data => data.users.findById(id)
    .then((userFound) => {
      if (!userFound) {
        return res.status(401).json({
          success: 'false',
          message: 'User does not exist in the database',
        });
      }
      const owner = userFound.id === userId;

      const updateProfile = {
        profileImage,
      };
      if (!owner) {
        return res.status(403).json({
          success: 'false',
          message: 'sorry, cannot modify an account that is not yours!',
        });
      }
      return db.users.modifyProfileImage(updateProfile, id)
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
            isAdmin: user.isadmin,
          }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
          return res.status(200).json({
            success: 'true',
            message: 'successful! your profile image has been updated',
            token,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: 'false',
            message: 'profile could not be modified',
            err: err.message,
          });
        });
    }))
    .catch((err) => {
      return res.status(500).json({
        success: 'false',
        message: 'oops! a problem occured, try again after a while',
        err: err.message,
      });
    });
}
}
export default UserController;
