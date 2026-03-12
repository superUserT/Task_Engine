import api from './api';
import { User } from '../types/User';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data.data;
};
