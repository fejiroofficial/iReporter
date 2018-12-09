/* eslint linebreak-style: "off" */

import express from 'express';
import UserController from '../controllers/users';
import ErrorController from '../helperfn/error';
import RedFlagController from '../controllers/redFlag';
import InterventionController from '../controllers/intervention';
import UpdateRedFlagController from '../controllers/updateRedflag';
import UpdateInterventionController from '../controllers/updateIntervention';
import middlewares from '../middlewares';


const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);
router.post('/auth/login', middlewares.validateLogin, UserController.login);

router.use('*', middlewares.verifyToken);
router.get('/red-flags', RedFlagController.getRedFlags);
router.get('/interventions', InterventionController.getInterventions);

router.post('/red-flags', middlewares.validatePostRedFlag, RedFlagController.postRedFlag);
router.post('/interventions', middlewares.validatePostRedFlag, InterventionController.postIntervention);

router.delete('/red-flags/:id([0-9]+)', RedFlagController.deleteRedFlag);
router.delete('/interventions/:id([0-9]+)', InterventionController.deleteIntervention);


router.patch('/red-flags/:id([0-9]+)/comment', middlewares.validateUpdateComment, UpdateRedFlagController.updateComment);
router.patch('/interventions/:id([0-9]+)/comment', middlewares.validateUpdateComment, UpdateInterventionController.updateComment);

router.patch('/red-flags/:id([0-9]+)/location', middlewares.validateUpdateLocation, UpdateRedFlagController.updateLocation);
router.patch('/interventions/:id([0-9]+)/location', middlewares.validateUpdateLocation, UpdateInterventionController.updateLocation);

router.patch('/red-flags/:id([0-9]+)/status', middlewares.validateStatus, UpdateRedFlagController.updateRedFlagStatus);
router.patch('/interventions/:id([0-9]+)/status', middlewares.validateStatus, UpdateRedFlagController.updateRedFlagStatus);

router.use(ErrorController.routeError);

export default router;
