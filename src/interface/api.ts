export interface BaseResponse {
  statusCode: number;
  message: string;
}
export interface CreateUserPayload {
  masterKey?: string;
  utm_source?: string | null;
}
export interface CreateUserResponse extends BaseResponse {
  dataKey: string;
  userKey: string;
  isLoggedIn: number;
}

export interface RegisterPayload {
  name: string;
  email: string;
  referralCode: string;
  agreeToTnC: boolean;
}

export interface VerifyOtpResponse extends BaseResponse {
  accessToken: string;
}

export interface RegisterResponse extends BaseResponse {
  accessToken: string;
}
