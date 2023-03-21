import { OrderDataType } from 'types/order';

const useStatusFilterOrder = (data: OrderDataType[], status: boolean | null) => {
  if (status === null) return data;
  return data.filter(v => v.status === status);
};

export default useStatusFilterOrder;
