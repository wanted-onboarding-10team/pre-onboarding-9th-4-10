import { OrderDataType } from 'types/order';

const useStatusFilterOrder = (data: OrderDataType[], status: boolean) => {
  return data.filter(v => v.status === status);
};

export default useStatusFilterOrder;
