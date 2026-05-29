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

export interface CryptoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap?: number;
  market_cap_rank?: number;
  total_volume?: number;
  high_24h?: number;
  low_24h?: number;
  price_change_percentage_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
  ath?: number;
  atl?: number;
}

export interface MarketResponse {
  status: string;
  data: CryptoMarket[];
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
