export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  FullName: string;
  Email: string;
  Phone?: string;
  Password: string;
}

export interface AuthResponse {
  role?: string;
  message: string;
  token: string;
}

export interface DoctorRegisterData extends RegisterData {
  licenseNumber: string;
  hospitalId?: number;
  specialtyId?: number;
  status: string;
}
