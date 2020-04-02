import axios from 'axios';

import { Board } from '@/@types';

class BoardService {
  async getBoards(): Promise<Board[] | null> {
    try {
      const result = await axios.get<Board[]>('/api/boards');
      return result.data;
    } catch (e) {
      return null;
    }
  }

  async getBoard(id: number): Promise<Board | null> {
    try {
      const results = await this.getBoards();
      if (results !== null) {
        return results.find(i => i.id === id) || null;
      }
    } catch (e) {
      return null;
    }
    return null;
  }
}

export const boardService = new BoardService();
