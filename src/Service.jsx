import axios from 'axios';

const BASE_URL = 'http://172.16.13.13:4000/api';

export const loginApi = async (item) => {
  const response = await axios.post(`${BASE_URL}/Login`, item);
  return response.data;
};
export const DisplayUser = async () => {
  const response = await axios.get(`${BASE_URL}/DisplayUser`);
  return response.data;
};