import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrderData } from 'hooks';
import { SINGLE_PAGE_SIZE, QUERY_KEY } from 'constants/index';
import { OrderData } from 'types';

const usePageData = () => {
  const { pageList, setPageList } = useOrderData();

  const [params] = useSearchParams();

  const page = Number(params.get(QUERY_KEY.page)) || 1;
  const sort = params.get(QUERY_KEY.sort) || '';

  const handleSortById = useCallback((order: string) => {
    setPageList(prev => {
      const newData = [...prev];
      newData.sort((current: OrderData, next: OrderData) =>
        order === 'asc' ? current.id - next.id : next.id - current.id,
      );
      return newData;
    });
  }, []);

  const handleSortByTime = useCallback((order: string) => {
    setPageList(prev => {
      const newData = [...prev];
      newData.sort((current: OrderData, next: OrderData) =>
        order === 'asc'
          ? new Date(current.transaction_time).getTime() - new Date(next.transaction_time).getTime()
          : new Date(next.transaction_time).getTime() -
            new Date(current.transaction_time).getTime(),
      );
      return newData;
    });
  }, []);

  useEffect(() => {
    if (sort) {
      const [standard, order] = sort.split(':');
      if (standard === QUERY_KEY.id) handleSortById(order as string);
      if (standard === QUERY_KEY.time) handleSortByTime(order as string);
    }
  }, [sort]);

  const pages = Math.ceil(pageList.length / SINGLE_PAGE_SIZE);

  const start = (page - 1) * SINGLE_PAGE_SIZE;
  const end = page * SINGLE_PAGE_SIZE;
  const paginatedData = pageList?.slice(start, end);

  return {
    pages,
    paginatedData,
  };
};

export default usePageData;
