import userRouter from './user';
import { Express } from 'express';

export default (app: Express) => {
    app.use('/api', userRouter);
};
