import { API_URL } from '@/api/const';
import axios from 'axios';

export const logout = async (token: string): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}session/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(true);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log((e as Error).message);
    return Promise.resolve(false);
  }
};
