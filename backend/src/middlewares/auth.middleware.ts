import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // JWT validation logic will go here
  console.log('Protecting route...');
  next();
};