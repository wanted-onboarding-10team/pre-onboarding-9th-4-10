import { useQuery } from '@tanstack/react-query';
import { getOrderListDataApi } from 'utils/api';

function useOrderList() {
  const res = useQuery({
    queryKey: ['orderList'],
    queryFn: getOrderListDataApi,
  });

  return res;
}

export default useOrderList;
