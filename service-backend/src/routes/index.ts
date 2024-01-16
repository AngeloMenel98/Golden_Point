import userRouter from './user';
import tourRouter from './tour';
import tournRouter from './tournament';
import { Express } from 'express';

export default (app: Express) => {
    app.use('/api', userRouter);
    app.use('/api', tourRouter);
    app.use('/api', tournRouter);
};
