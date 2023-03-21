import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUERY_KEY, SORT_TYPE } from 'constants/index';

const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQuery = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERY_KEY.page)) {
      handleQuery(QUERY_KEY.page, '1');
      handleQuery(QUERY_KEY.sort, SORT_TYPE.id_asc);
    }
  }, [searchParams]);

  return handleQuery;
};

export default useQuery;
