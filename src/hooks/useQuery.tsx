import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUERY_KEY, SORT_TYPE } from 'constants/index';

const useQuery = () => {
  const [params, setParams] = useSearchParams();

  const handleQuery = (key: string, value: string) => {
    params.set(key, value);
    setParams(params);
  };

  useEffect(() => {
    if (!params.get(QUERY_KEY.page)) {
      handleQuery(QUERY_KEY.page, '1');
      handleQuery(QUERY_KEY.sort, SORT_TYPE.id_asc);
    }
  }, [params]);

  return handleQuery;
};

export default useQuery;
