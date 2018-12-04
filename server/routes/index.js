/* eslint linebreak-style: "off" */

import express from 'express';
import middlewares from '../middlewares';
import ErrorController from '../helperfn/error';
import redFlagController from '../controllers/redFlag';
import UpdateRedFlagController from '../controllers/updateRedflag';


const router = express.Router();

router.route('/red-flags')
  .get(redFlagController.getRedFlags)
  .post(middlewares.validatePostRedFlag, redFlagController.postRedFlag);

router.route('/red-flags/:id([0-9]+)')
  .get(middlewares.validateParam, redFlagController.getRedFlag)
  .delete(middlewares.validateParam, redFlagController.deleteRedFlag);

router.patch('/red-flags/:id([0-9]+)/location', middlewares.validateUpdateLocation, UpdateRedFlagController.updateLocation);
router.patch('/red-flags/:id([0-9]+)/comment', middlewares.validateUpdateComment, UpdateRedFlagController.updateComment);

router.use(ErrorController.routeError);

export default router;
