import { useSearchParams } from 'react-router-dom';

const useParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortKey: string[] = searchParams.getAll('sort');
  const filter = searchParams.get('filter');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') ?? '1');

  const setSortKey = (key: string) => {
    const newSortKey = sortKey.includes(key)
      ? sortKey.filter(value => value !== key)
      : [...sortKey, key];
    searchParams.delete('sort');
    newSortKey.forEach(key => {
      searchParams.append('sort', key);
    });
    setSearchParams(searchParams);
  };

  const setFiltering = (status: boolean) => {
    setSearchParams(searchParams => {
      if (filter === '' + status) {
        searchParams.delete('filter');
      } else {
        searchParams.set('filter', '' + status);
      }
      return searchParams;
    });
  };

  return { sortKey, setSortKey, filter, setFiltering, search, page };
};

export default useParams;
