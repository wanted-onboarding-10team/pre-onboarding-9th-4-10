import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { search } from 'utils/api';

const useOrderData = () => {
  const [searchParams, _] = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [pageList, setPageList] = useState([]);

  const search_Name = searchParams.get('search') ?? '';

  const { isLoading, data: todayData } = useQuery(['todayData', keyword], () => search(keyword));

  useEffect(() => {
    setKeyword(search_Name);
  }, [searchParams]);

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
