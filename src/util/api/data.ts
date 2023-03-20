import axios from 'axios';

export const getDataApi = async () => {
  return await axios.get(`/data/mock_data.json`);
};
