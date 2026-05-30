export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: {
    otp?: string;
    id: string;
    email: string;
    phone: string;
    token: string;
  };
}

export interface OtpRequest {
  otp: string;
  phone: string;
}

export interface OtpResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: Record<string, never>;
}

export interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_idr: string;
  change_percent: string;
  isPositive: boolean;
  hot: boolean;
  isFavorite: boolean;
  type: string;
}

export interface MarketResponse {
  status: string;
  data: CryptoItem[];
}

export interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    phone: string;
  } | null;
  isAuthenticated: boolean;
}
