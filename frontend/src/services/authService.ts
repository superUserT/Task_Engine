import api from './api';
import { User } from '../types/User';

interface AuthResponse {
  token: string;
  user: User;
}

export const register = async (userData: any): Promise<AuthResponse> => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const login = async (credentials: any): Promise<AuthResponse> => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};
