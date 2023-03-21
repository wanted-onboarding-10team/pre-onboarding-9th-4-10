import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQuery = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.get('page')) {
      handleQuery('page', '1');
      handleQuery('sort', 'id:asc');
    }
  }, []);

  return handleQuery;
};

export default useQuery;
