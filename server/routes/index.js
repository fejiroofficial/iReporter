/* eslint linebreak-style: "off" */

import express from 'express';
import middlewares from '../middlewares';
import redFlagController from '../controllers/redFlag';

const router = express.Router();

router.route('/red-flags')
  .get(redFlagController.getRedFlags)
  .post(middlewares.validatePostRedFlag, redFlagController.postRedFlag);
router.route('/red-flags/:id')
  .get(redFlagController.getRedFlag);
router.patch('/red-flags/:id/location', middlewares.validateUpdateLocation, redFlagController.updateLocation);

export default router;
