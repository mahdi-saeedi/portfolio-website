// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

// Contact form type
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
