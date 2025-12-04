import axios from 'axios';
import { Project, ContactForm } from '../types';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service object
export const apiService = {
  // Fetch all projects
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/api/projects');
    return response.data;
  },

  // Submit contact form
  submitContact: async (data: ContactForm): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/api/contact', data);
    return response.data;
  },
};

export default api;
