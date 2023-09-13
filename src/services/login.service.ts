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
