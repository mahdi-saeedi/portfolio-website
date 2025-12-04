// TypeScript type definitions for the backend

/**
 * Project entity from database
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link: string | null;
}

/**
 * Contact message entity from database
 */
export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}

/**
 * Contact form request body
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
