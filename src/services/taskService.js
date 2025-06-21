import { apiClientService } from './apiClientService';

export const taskService = {
  
  getAll: () => apiClientService.get('/api/task'),
  
  getByUserId: (userId) => apiClientService.get(`/api/task/user/${userId}`),
  
  getById: (id) => apiClientService.get(`/api/task/${id}`),
  
  searchByTitle: (title) => apiClientService.get(`/api/task/search?title=${encodeURIComponent(title)}`),
  
  create: (taskData) => apiClientService.post('/api/task', taskData),
  
  update: (id, taskData) => apiClientService.put(`/api/task/${id}`, taskData),
  
  delete: (id) => apiClientService.delete(`/api/task/${id}`),
  
  deleteAllByUserId: (userId) => apiClientService.delete(`/api/task/user/${userId}`),
};