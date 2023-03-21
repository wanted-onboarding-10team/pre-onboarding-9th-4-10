import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { search } from 'utils/api';

const useOrderData = () => {
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [pageList, setPageList] = useState([]);

  const name = searchParams.get('search') ?? '';
  const filter = searchParams.get('filter') ?? '';

  const { isLoading, data: todayData } = useQuery(['todayData', keyword], () => search(keyword), {
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (name) return setKeyword(name);
    if (filter) return setKeyword(filter);
    setKeyword('');
  }, [searchParams, name, filter]);

  useEffect(() => {
    if (todayData) {
      setPageList(todayData);
    }
  }, [todayData]);

  return {
    isLoading,
    pageList,
    setPageList,
  };
};

export default useOrderData;
