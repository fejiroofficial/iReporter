/* eslint linebreak-style: "off" */

import express from 'express';
import UserController from '../controllers/users';
import ErrorController from '../helpers/error';
import RedFlagController from '../controllers/redFlag';
import InterventionController from '../controllers/intervention';
import UpdateRedFlagController from '../controllers/updateRedflag';
import UpdateInterventionController from '../controllers/updateIntervention';
import middlewares from '../middlewares';


const router = express.Router();

router.post('/auth/signup',
  middlewares.validateSignup,
  UserController.signup);

router.post('/auth/login',
  middlewares.validateLogin,
  UserController.login);

router.use('*', middlewares.verifyToken);

router.patch('/users/:id',
  middlewares.validateUpdateImage,
  UserController.updateUserImage);

router.get('/red-flags', RedFlagController.getRedFlags);

router.get('/interventions', InterventionController.getInterventions);

router.get('/red-flags/:id', RedFlagController.getRedFlag);

router.get('/interventions/:id',
  InterventionController.getIntervention);

router.post('/red-flags',
  middlewares.validatePostRedFlag,
  RedFlagController.postRedFlag);

router.post('/interventions',
  middlewares.validatePostRedFlag,
  InterventionController.postIntervention);

router.delete('/red-flags/:id',
  RedFlagController.deleteRedFlag);

router.delete('/interventions/:id',
  InterventionController.deleteIntervention);


router.patch('/red-flags/:id/comment',
  middlewares.validateUpdateComment,
  UpdateRedFlagController.updateComment);

router.patch('/interventions/:id/comment',
  middlewares.validateUpdateComment,
  UpdateInterventionController.updateComment);

router.patch('/red-flags/:id/location',
  middlewares.validateUpdateLocation,
  UpdateRedFlagController.updateLocation);

router.patch('/interventions/:id/location',
  middlewares.validateUpdateLocation,
  UpdateInterventionController.updateLocation);

router.patch('/red-flags/:id/status',
  middlewares.validateStatus,
  UpdateRedFlagController.updateRedFlagStatus);

router.patch('/interventions/:id/status',
  middlewares.validateStatus,
  UpdateInterventionController.updateInterventionStatus);

router.use(ErrorController.routeError);

export default router;
