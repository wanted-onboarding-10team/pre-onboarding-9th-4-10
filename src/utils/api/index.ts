import axios from 'axios';

export const getOrderListDataApi = async () => {
  const { data: response } = await axios.get(`/data/mock_data.json`);
  return response;
};
