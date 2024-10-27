export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: "patient" | "doctor" | "hospital_admin" | "system_admin";
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: User["role"];
}

export interface AuthResponse {
  user: User;
  token: string;
}
