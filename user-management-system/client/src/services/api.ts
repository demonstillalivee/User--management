import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your API URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = () => api.get('/users/profile');
export const updateUserProfile = (userData: { name: string; email: string; bio: string }) =>
  api.put('/users/profile', userData);
export const getAllUsers = () => api.get('/users');
export const getUserById = (id: string) => api.get(`/users/${id}`);

export default api;
