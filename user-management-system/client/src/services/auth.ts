import api from './api';

export const loginUser = (credentials: { email: string; password: string }) =>
  api.post('/auth/login', credentials);

export const registerUser = (userData: { name: string; email: string; password: string }) =>
  api.post('/auth/register', userData);

export const logoutUser = () => {
  localStorage.removeItem('token');
};
