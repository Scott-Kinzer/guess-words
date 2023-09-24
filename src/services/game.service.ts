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

export type WordGuessResponse = {
  message: string;
};

export type WordGuessRequest = {
  wordId: string;
  word: string;
};

export const wordGuessRequest = async ({
  wordId,
  word,
}: WordGuessRequest): Promise<WordGuessResponse> => {
  const response = await axiosClient.post(`words/${wordId}`, {
    word,
  });

  return response.data;
};

export type WordHintRequest = {
  level: number;
  wordId: string;
};

export type WordHintResponse = {
  id: string;
  wordId: string;
  hint: string;
  levelHint: number;
};

export const wordhintRequest = async ({
  wordId,
  level,
}: WordHintRequest): Promise<WordHintResponse> => {
  const response = await axiosClient.get(`words/hint/${wordId}/${level}`);

  return response.data;
};
