import userRouter from './user';
import tourRouter from './tour';
import { Express } from 'express';

export default (app: Express) => {
    app.use('/api', userRouter);
    app.use('/api', tourRouter);
};
