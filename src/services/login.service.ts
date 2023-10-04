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

export type ValidatePincodeRequest = {
  email: string;
  pincode: string;
};

type ValidatePincodeResponse = {
  message: string;
};

export const validatePincodeRequest = async (
  requestData: ValidatePincodeRequest,
): Promise<ValidatePincodeResponse> => {
  const response = await axiosClient.post<ForgotPasswordResponse>(
    'auth/pincode-validate',
    {
      email: requestData.email,
      pincode: requestData.pincode,
    },
  );

  return response.data;
};

export type UpdatePasswordRequest = {
  password: string;
  email: string;
  pincode: string;
};

type UpdatePasswordResponse = {
  message: string;
};

export const updatePasswordRequest = async (
  requestData: UpdatePasswordRequest,
): Promise<UpdatePasswordResponse> => {
  const response = await axiosClient.post<ForgotPasswordResponse>(
    'auth/password-recovery',
    {
      email: requestData.email,
      pincode: requestData.pincode,
      password: requestData.password,
    },
  );

  return response.data;
};
