import axios from "axios";
import { LoginCredentials, RegisterData, AuthResponse } from "../types/auth";

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

  async verifyEmail(token: string): Promise<void> {
    await axios.post(`${API_URL}/auth/verify-email`, { token });
  },

  async forgotPassword(email: string): Promise<void> {
    await axios.post(`${API_URL}/auth/forgot-password`, { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
  },
};
