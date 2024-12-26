import express from 'express';
const router = express.Router();

import userAuthRouter from './user';
import adminAuthRouter from './admin';

router.use('/user', userAuthRouter);
//router.use('/admin', adminAuthRouter);

export default router;