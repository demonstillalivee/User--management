export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ProfileUpdateData {
  name: string;
  email: string;
  bio: string;
}
