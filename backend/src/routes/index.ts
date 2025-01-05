import express from 'express';
const router = express.Router();

import userRouter from './user';
import publicRouter from './public';
import adminRouter from './admin';

router.use('/user', userRouter);
router.use('/public', publicRouter);
router.use('/admin', adminRouter);

export default router;