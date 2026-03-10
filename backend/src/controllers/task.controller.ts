import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Task } from '../entities/Task';
import { errorMessages, formatResponse, successMessages } from '../utils/helper_objects';
import logger from '../config/logger';

const taskRepository = AppDataSource.getRepository(Task);

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { cohortId } = req.query;
    const whereClause = cohortId ? { cohort_id: cohortId as string } : {};
    const tasks = await taskRepository.find({ where: whereClause, relations: ['assignee'] });
    res.status(200).json(formatResponse(true, successMessages.retrieved('Tasks'), tasks));
  } catch (error) {
    logger.error(errorMessages.retrievalError('tasks'), error);
    res.status(500).json(formatResponse(false, errorMessages.retrievalError('tasks')));
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskRepository.findOne({
      where: { id: req.params.id as string },
      relations: ['cohort', 'assignee'],
    });
    if (!task) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('Task')));
    }
    res.status(200).json(formatResponse(true, successMessages.retrieved('Task'), task));
  } catch (error) {
    logger.error(errorMessages.retrievalError('task'), error);
    res.status(500).json(formatResponse(false, errorMessages.retrievalError('task')));
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = taskRepository.create(req.body);
    await taskRepository.save(task);
    res.status(201).json(formatResponse(true, successMessages.created('Task'), task));
  } catch (error) {
    logger.error(errorMessages.creationError('task'), error);
    res.status(500).json(formatResponse(false, errorMessages.creationError('task')));
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const result = await taskRepository.update(req.params.id as string, req.body);
    if (result.affected === 0) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('Task')));
    }
    const updatedTask = await taskRepository.findOneBy({ id: req.params.id as string });
    res.status(200).json(formatResponse(true, successMessages.updated('Task'), updatedTask));
  } catch (error) {
    logger.error(errorMessages.updateError('task'), error);
    res.status(500).json(formatResponse(false, errorMessages.updateError('task')));
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await taskRepository.delete(req.params.id as string);
    if (result.affected === 0) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('Task')));
    }
    res.status(200).json(formatResponse(true, successMessages.deleted('Task')));
  } catch (error) {
    logger.error(errorMessages.deleteError('task'), error);
    res.status(500).json(formatResponse(false, errorMessages.deleteError('task')));
  }
};