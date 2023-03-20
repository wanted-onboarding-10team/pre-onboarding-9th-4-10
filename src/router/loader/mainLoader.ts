import { getOrderDataApi } from 'utils/api/order';

const mainLoader = async () => {
  const { data } = await getOrderDataApi();

  return data;
};
export default mainLoader;
