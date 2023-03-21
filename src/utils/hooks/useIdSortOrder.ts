import { OrderDataType } from 'types/order';
import { SortType } from 'types/sort';

const useIdSortOrder = (data: OrderDataType[], sort: SortType) => {
  if (sort === null) return data;

  return [...data].sort((a, b) => {
    if (sort === 'asc') return a.id - b.id;
    else return b.id - a.id;
  });
};

export default useIdSortOrder;
