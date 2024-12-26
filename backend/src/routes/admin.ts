import express from 'express';
const router = express.Router();

import AuthRouter from './adminauth';
import DashboardRouter from './admindashboard'

router.use('/auth', AuthRouter);
router.use('/dashboard', DashboardRouter);

export default router;