import axios from 'axios';

export const getOrderDataApi = async () => {
  return await axios.get(`/data/mock_data.json`);
};
