import {axiosClient} from '../axios';

export const categoriesRequest = async (): Promise<{type: string}[]> => {
  const response = await axiosClient.get('words/list/types');

  return response.data;
};
