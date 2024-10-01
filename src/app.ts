/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Softcar API!');
});

// app.use(companyDbMiddleware);
// application routes

app.use('/api', router);




app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;