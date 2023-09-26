import {axiosClient} from '../axios';

export type RegisterRequestType = {
  email: string;
  password: string;
};

type RegisterResponseType = {
  id: string;
  email: string;
};

export const registerRequest = async (
  requestData: RegisterRequestType,
): Promise<RegisterResponseType> => {
  const response = await axiosClient.post<RegisterResponseType>(
    'auth/register',
    {email: requestData.email, password: requestData.password},
  );

  return response.data;
};

export type PincodeRequestType = {
  email: string;
  pincode: string;
};

export type PincodeResponseType = {
  accessToken: string;
  refreshToken: string;
};

export const pincodeRequest = async (
  requestData: PincodeRequestType,
): Promise<PincodeResponseType> => {
  const response = await axiosClient.post<PincodeResponseType>('auth/pincode', {
    email: requestData.email,
    pincode: requestData.pincode,
  });

  return response.data;
};

export type ResendPincodeRequestType = {
  email: string;
};

export const resendPincodeRequest = async (
  requestData: ResendPincodeRequestType,
): Promise<PincodeResponseType> => {
  const response = await axiosClient.post<PincodeResponseType>(
    'auth/resend-pincode',
    {
      email: requestData.email,
    },
  );

  return response.data;
};
