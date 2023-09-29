import {axiosClient} from '../axios';

export type LoginRequestType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
};

export const loginRequest = async (
  requestData: LoginRequestType,
): Promise<LoginResponseType> => {
  const response = await axiosClient.post<LoginResponseType>('auth/login', {
    email: requestData.email,
    password: requestData.password,
  });

  return response.data;
};

export type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

export const forgotPasswordRequest = async (
  requestData: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await axiosClient.post<ForgotPasswordResponse>(
    'auth/forgot-password',
    {
      email: requestData.email,
    },
  );

  return response.data;
};
