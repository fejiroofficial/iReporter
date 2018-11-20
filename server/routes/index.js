import express from 'express';
import redFlagController from '../controllers/redFlag';

const router = express.Router();

router.route('/red-flags')
  .get(redFlagController.getRedFlags);
router.route('/red-flags/:id')
  .get(redFlagController.getRedFlag);

export default router;
