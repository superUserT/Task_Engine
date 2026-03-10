import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { errorMessages, formatResponse } from '../utils/helper_objects';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import logger from '../config/logger';

const userRepository = AppDataSource.getRepository(User);

// Extend the Express Request interface to include a user property
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!process.env.JWT_SECRET) {
        throw new Error(errorMessages.jwtSecretMissing);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      const currentUser = await userRepository.findOneBy({ id: decoded.id });

      if (!currentUser) {
        return res.status(401).json(formatResponse(false, errorMessages.unauthorized));
      }

      req.user = currentUser;
      next();
    } catch (error) {
      logger.error('Authentication error:', error);
      return res.status(401).json(formatResponse(false, errorMessages.invalidToken));
    }
  }

  if (!token) {
    return res.status(401).json(formatResponse(false, errorMessages.unauthorized));
  }
};