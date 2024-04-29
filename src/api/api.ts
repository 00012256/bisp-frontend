import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const getData = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(url, {
    headers: authHeader,
  });
  return response.data;
};

export const postData = async <T>(url: string, payload: any): Promise<T> => {
  const response: AxiosResponse<T> = await axios.post(url, payload, {
    headers: authHeader,
  });
  return response.data;
};

export const putData = async <T>(url: string, payload?: any): Promise<T> => {
  const response: AxiosResponse<T> = await axios.put(url, payload, {
    headers: authHeader,
  });
  return response.data;
};

export const deleteData = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.delete(url, {
    headers: authHeader,
  });
  return response.data;
};
