import express, { Application, Request, Response } from 'express';
import mainRouter from './routes';

const app: Application = express();


app.get('/', (req: Request, res: Response) => {
  res.send('Checks out Big Dawg');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', mainRouter);


app.get('/health', (req: Request, res: Response) => res.status(200).send('OK'));

export default app;