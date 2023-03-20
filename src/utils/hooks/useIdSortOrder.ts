import { OrderDataType } from 'types/order';
import { SortType } from 'types/sort';

const useIdSortOrder = (data: OrderDataType[], sort: SortType) => {
  if (sort === 'asc') {
    return data.sort((a, b) => a.id - b.id);
  } else {
    return data.sort((a, b) => b.id - a.id);
  }
};

export default useIdSortOrder;
