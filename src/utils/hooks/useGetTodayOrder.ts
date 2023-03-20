import { TODAY } from 'shared/Date';
import { OrderDataType } from 'types/order';

const useGetTodayOrder = (data: OrderDataType[]) =>
  data.filter(v => new Date(v.transaction_time).toDateString() === TODAY);

export default useGetTodayOrder;
