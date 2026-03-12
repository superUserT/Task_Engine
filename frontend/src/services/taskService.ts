import api from './api';
import { Task } from '../types/Task';

export const getTasks = async (cohortId?: string): Promise<Task[]> => {
  const response = await api.get('/tasks', { params: { cohortId } });
  return response.data.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const response = await api.post('/tasks', taskData);
  return response.data.data;
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};