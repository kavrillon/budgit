import axios from 'axios';

import { Board } from '@types';

class BoardService {
  async getBoards(): Promise<Board[]> {
    try {
      const result = await axios.get<Board[]>('/api/boards');
      return result.data;
    } catch (e) {
      throw new Error('Error while requesting boards');
    }
  }

  async getBoard(id: number): Promise<Board> {
    let results: Board[] = [];
    try {
      results = await this.getBoards();
    } catch (e) {
      throw new Error('Error while requesting board');
    }

    const board = results.find(i => i.id === id);
    if (typeof board !== 'undefined') {
      return board;
    } else {
      throw new Error('Requested board does not exist');
    }
  }
}

export const boardService = new BoardService();
