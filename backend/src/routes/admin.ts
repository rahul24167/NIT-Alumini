import express from 'express';
const router = express.Router();

import AuthRouter from './adminauth';
import DashboardRouter from './admindashboard'

router.use('/userauth', AuthRouter);
router.use('/userdashboard', DashboardRouter);

export default router;