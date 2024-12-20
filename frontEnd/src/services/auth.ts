import axios from "axios";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  DoctorRegisterData,
} from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },
  async registerDoctor(data: DoctorRegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/registerDoctor`, data);
    return response.data;
  },
};
