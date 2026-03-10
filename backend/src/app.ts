import express, { Application, Request, Response } from 'express';
import mainRouter from './routes';

const app: Application = express();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - All routes will be prefixed with /api/v1
app.use('/api/v1', mainRouter);

// Simple health check endpoint
app.get('/health', (req: Request, res: Response) => res.status(200).send('OK'));

export default app;