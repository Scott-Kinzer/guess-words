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
