import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Cohort } from '../entities/Cohort';
import { errorMessages, formatResponse, successMessages } from '../utils/helper_objects';
import logger from '../config/logger';

const cohortRepository = AppDataSource.getRepository(Cohort);

export const getAllCohorts = async (req: Request, res: Response) => {
  try {
    const cohorts = await cohortRepository.find();
    res.status(200).json(formatResponse(true, successMessages.retrieved('Cohorts'), cohorts));
  } catch (error) {
    logger.error(errorMessages.retrievalError('cohorts'), error);
    res.status(500).json(formatResponse(false, errorMessages.retrievalError('cohorts')));
  }
};

export const getCohortById = async (req: Request, res: Response) => {
  try {
    const cohort = await cohortRepository.findOne({
      where: { id: req.params.id as string },
      relations: ['tasks', 'cohortMembers', 'cohortMembers.user'],
    });

    if (!cohort) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('Cohort')));
    }

    res.status(200).json(formatResponse(true, successMessages.retrieved('Cohort'), cohort));
  } catch (error) {
    logger.error(errorMessages.retrievalError('cohort'), error);
    res.status(500).json(formatResponse(false, errorMessages.retrievalError('cohort')));
  }
};

export const createCohort = async (req: Request, res: Response) => {
  try {
    const cohort = cohortRepository.create(req.body);
    await cohortRepository.save(cohort);
    res.status(201).json(formatResponse(true, successMessages.created('Cohort'), cohort));
  } catch (error) {
    logger.error(errorMessages.creationError('cohort'), error);
    res.status(500).json(formatResponse(false, errorMessages.creationError('cohort')));
  }
};

export const updateCohort = async (req: Request, res: Response) => {
  try {
    const result = await cohortRepository.update(req.params.id, req.body);
    if (result.affected === 0) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('Cohort')));
    }
    const updatedCohort = await cohortRepository.findOneBy({ id: req.params.id as string });
    res.status(200).json(formatResponse(true, successMessages.updated('Cohort'), updatedCohort));
  } catch (error) {
    logger.error(errorMessages.updateError('cohort'), error);
    res.status(500).json(formatResponse(false, errorMessages.updateError('cohort')));
  }
};

export const deleteCohort = async (req: Request, res: Response) => {
  try {
    const result = await cohortRepository.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json(formatResponse(false, errorMessages.notFound('Cohort')));
    }
    res.status(200).json(formatResponse(true, successMessages.deleted('Cohort')));
  } catch (error) {
    logger.error(errorMessages.deleteError('cohort'), error);
    res.status(500).json(formatResponse(false, errorMessages.deleteError('cohort')));
  }
};