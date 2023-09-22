import {axiosClient} from '../axios';

export type WordDetailsResponse = {
  wordLength: number;
  maxLevelHint: number;
  id: string;
  type: string;
  level: number;
  hint: {
    id: string;
    wordId: string;
    hint: string;
    levelHint: number;
  };
};

export type WordDetailsRequest = {
  wordId: string;
};

export const wordDetailsRequest = async ({
  wordId,
}: WordDetailsRequest): Promise<WordDetailsResponse> => {
  const response = await axiosClient.get(`words/${wordId}`);

  return response.data;
};
