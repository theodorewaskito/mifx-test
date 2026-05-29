import axios from 'axios';
import { LoginRequest, LoginResponse, OtpRequest, OtpResponse } from '@/types';

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await client.post('/auth/login', data);
    return response.data;
  },

  verifyOtp: async (data: OtpRequest): Promise<OtpResponse> => {
    const response = await client.post('/auth/verify-otp', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
  },
};
