import { OrderDataType } from 'types/order';

const useFilterOrder = (data: OrderDataType[], keyword: string) => {
  if (keyword === '') return data;
  return data.filter(v => v.customer_name.toLowerCase().includes(keyword.toLowerCase()));
};

export default useFilterOrder;
