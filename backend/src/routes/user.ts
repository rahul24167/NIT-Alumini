import express from 'express';
const router = express.Router();

import userAuthRouter from './userauth';
import userDashboardRouter from './userdashboard'

router.use('/userauth', userAuthRouter);
router.use('/userdashboard', userDashboardRouter);

export default router;