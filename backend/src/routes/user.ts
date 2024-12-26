import express from 'express';
const router = express.Router();

import userAuthRouter from './userauth';
import userDashboardRouter from './userdashboard'

router.use('/auth', userAuthRouter);
router.use('/dashboard', userDashboardRouter);

export default router;