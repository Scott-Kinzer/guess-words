import {axiosClient} from '../axios';

export const categoriesRequest = async (): Promise<{type: string}[]> => {
  const response = await axiosClient.get('words/list/types');

  return response.data;
};

export type WordListResponse = {
  is_guessed: boolean;
  level: number;
  type: string;
  word_id: string;
};

export const categoryRequest = async ({
  type,
}: {
  type: string;
}): Promise<WordListResponse[]> => {
  const response = await axiosClient.get(`words/list/${type}`);

  return response.data;
};
