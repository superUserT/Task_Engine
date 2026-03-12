import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { errorMessages, formatResponse, successMessages } from '../utils/helper_objects';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at'], // Exclude password hash
    });
    res.status(200).json(formatResponse(true, successMessages.retrieved('Users'), users));
  } catch (error) {
    logger.error(errorMessages.retrievalError('users'), error);
    res.status(500).json(formatResponse(false, errorMessages.retrievalError('users')));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.params.id as string },
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
    });
    if (!user) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('User')));
    }
    res.status(200).json(formatResponse(true, successMessages.retrieved('User'), user));
  } catch (error) {
    logger.error(errorMessages.retrievalError('user'), error);
    res.status(500).json(formatResponse(false, errorMessages.retrievalError('user')));
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      return res.status(400).json(formatResponse(false, errorMessages.passwordRequired));
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password_hash });
    await userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...userResponse } = user;
    res.status(201).json(formatResponse(true, successMessages.created('User'), userResponse));
  } catch (error: any) {
    logger.error(errorMessages.creationError('user'), error);
    if (error.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json(formatResponse(false, errorMessages.emailExists));
    }
    res.status(500).json(formatResponse(false, errorMessages.creationError('user')));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userRepository.update(req.params.id as string, req.body);
    if (result.affected === 0) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('User')));
    }
    const updatedUser = await userRepository.findOneBy({ id: req.params.id as string });
    res.status(200).json(formatResponse(true, successMessages.updated('User'), updatedUser));
  } catch (error) {
    logger.error(errorMessages.updateError('user'), error);
    res.status(500).json(formatResponse(false, errorMessages.updateError('user')));
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json(formatResponse(false, errorMessages.invalidCredentials));
    }

    if (!process.env.JWT_SECRET) {
      logger.error(errorMessages.jwtSecretMissing);
      return res.status(500).json(formatResponse(false, 'Server configuration error.'));
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...userResponse } = user;

    res.status(200).json(
      formatResponse(true, successMessages.loginSuccess, {
        user: userResponse,
        token,
      })
    );
  } catch (error) {
    logger.error('Login error', error);
    res.status(500).json(formatResponse(false, 'An internal server error occurred.'));
  }
};