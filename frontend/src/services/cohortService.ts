import api from './api';
import { Cohort } from '../types/Cohort';

export const getCohorts = async (): Promise<Cohort[]> => {
  const response = await api.get('/cohorts');
  return response.data.data;
};

export const createCohort = async (cohortData: any): Promise<Cohort> => {
  const response = await api.post('/cohorts', cohortData);
  return response.data.data;
};

export const getCohortById = async (id: string): Promise<Cohort> => {
  const response = await api.get(`/cohorts/${id}`);
  return response.data.data;
};
