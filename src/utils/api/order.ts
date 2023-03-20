import axios, { AxiosResponse } from 'axios';
import { Order } from 'types/Order';

export const getOrders = async () => {
  const response = await axios.get<any, AxiosResponse<Order[]>>('./data/mock_data.json');
  return response.data;
};
