import { API_URL } from '@/api/const';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { NewTodo, TodoType } from '@/types/todoType';
import { apiReturn } from '@/types/apiReturn';

export const getTodos = async (
  token: string
): Promise<TodoType[] | apiReturn> => {
  try {
    const query = await axios.get(`${API_URL}todo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return query.data.todos;
  } catch (e) {
    const error = e as AxiosError;
    const errorResponse = error.response as AxiosResponse;
    const apiReturn: apiReturn = {
      httpCode: error.response?.status || 400,
      message: JSON.stringify(errorResponse?.data?.message),
      success: false,
    };
    return apiReturn;
  }
};

export const deleteTodo = async (
  token: string,
  id: number
): Promise<apiReturn> => {
  try {
    const query = await axios.delete(`${API_URL}todo`, {
      headers: { Authorization: `Bearer ${token}` },
      data: JSON.stringify({ id }),
    });
    const apiReturn: apiReturn = {
      httpCode: query.request.status,
      message: query.data.message,
      success: true,
    };
    return apiReturn;
  } catch (e) {
    const error = e as AxiosError;
    const errorResponse = error.response as AxiosResponse;
    const apiReturn: apiReturn = {
      httpCode: error.response?.status || 400,
      message: JSON.stringify(errorResponse?.data?.message),
      success: false,
    };
    return apiReturn;
  }
};

export const updateTodo = async (
  token: string,
  todo: TodoType
): Promise<apiReturn> => {
  return runQuery('put', token, todo);
};

export const createTodo = async (
  token: string,
  todo: TodoType | NewTodo
): Promise<apiReturn> => {
  return runQuery('post', token, todo);
};

// Dynamic query
const runQuery = async (
  httpVerb: string,
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  todo: any
): Promise<apiReturn> => {
  try {
    const query = await axios({
      method: httpVerb,
      url: `${API_URL}todo`,
      data: JSON.stringify(todo),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const apiReturn: apiReturn = {
      httpCode: query.request.status,
      message: query.data.message,
      success: true,
    };
    return apiReturn;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log((e as Error).message);
    const error = e as AxiosError;
    const errorResponse = error.response as AxiosResponse;
    const apiReturn: apiReturn = {
      httpCode: error.response?.status || 400,
      message: JSON.stringify(errorResponse?.data?.message),
      success: false,
    };
    return apiReturn;
  }
};
