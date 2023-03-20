import { OrderDataType } from 'types/order';
import { SortType } from 'types/sort';

const useTimeSortOrder = (data: OrderDataType[], sort: SortType) => {
  return data.sort((a, b) => {
    if (sort === 'asc') {
      return new Date(a.transaction_time).getTime() - new Date(b.transaction_time).getTime();
    } else {
      return new Date(b.transaction_time).getTime() - new Date(a.transaction_time).getTime();
    }
  });
};

export default useTimeSortOrder;
