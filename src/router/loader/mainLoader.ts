import { OrderDataType } from 'types/order';
import { getOrderDataApi } from 'utils/api/order';
import { useGetTodayOrder } from 'utils/hooks';

const mainLoader = async () => {
  const { data }: { data: OrderDataType[] } = await getOrderDataApi();

  return useGetTodayOrder(data);
};
export default mainLoader;
