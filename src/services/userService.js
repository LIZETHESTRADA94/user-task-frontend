import { apiClientService } from './apiClientService';

export const userService = {
  
  getAll: () => apiClientService.get('/api/user'),
  
  getById: (id) => apiClientService.get(`/api/user/${id}`),
  
  getByEmail: (email) => apiClientService.get(`/api/user/by-email?email=${encodeURIComponent(email)}`),
  
  create: (userData) => apiClientService.post('/api/user', userData),
  
  update: (id, userData) => apiClientService.put(`/api/user/${id}`, userData),
  
  delete: (id) => apiClientService.delete(`/api/user/${id}`),

  getStats: () => apiClientService.get('/api/user/stats'),
};