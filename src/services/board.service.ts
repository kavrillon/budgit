import { Board } from '@/@types';
import { get } from '@/services/api.service';

const JSON_PATH = '/data/board';

export const getBoard = async (id: number): Promise<Board> => {
  const jsonBoard = await get(`${JSON_PATH}/${id}.json`);
  return Promise.resolve(jsonBoard);
};
