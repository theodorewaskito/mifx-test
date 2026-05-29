import { LoginRequest, LoginResponse, OtpRequest, OtpResponse } from '@/types';
import { api } from './api';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  verifyOtp: async (data: OtpRequest): Promise<OtpResponse> => {
    const response = await api.post('/auth/otp', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
