/* eslint linebreak-style: "off" */

import express from 'express';
import UserController from '../controllers/users';
import ErrorController from '../helperfn/error';
import RedFlagController from '../controllers/redFlag';
import InterventionController from '../controllers/intervention';
import UpdateRedFlagController from '../controllers/updateRedflag';
import middlewares from '../middlewares';


const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);
router.post('/auth/login', middlewares.validateLogin, UserController.login);

router.route('/red-flags')
  .get(RedFlagController.getRedFlags);

router.route('/red-flags/:id([0-9]+)')
  .get(middlewares.validateParam, RedFlagController.getRedFlag)
  .delete(middlewares.validateParam, RedFlagController.deleteRedFlag);

router.patch('/red-flags/:id([0-9]+)/location', middlewares.validateUpdateLocation, UpdateRedFlagController.updateLocation);
router.patch('/red-flags/:id([0-9]+)/comment', middlewares.validateUpdateComment, UpdateRedFlagController.updateComment);

router.use('*', middlewares.verifyToken);
router.post('/red-flags', middlewares.validatePostRedFlag, RedFlagController.postRedFlag);
router.post('/interventions', middlewares.validatePostRedFlag, InterventionController.postIntervention);

router.use(ErrorController.routeError);

export default router;
