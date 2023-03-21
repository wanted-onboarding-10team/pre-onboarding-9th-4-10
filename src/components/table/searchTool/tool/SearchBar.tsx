import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = () => {
  const [query, setQuery] = useSearchParams();

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const prevQuery = Array.from(query).reduce((prev: { [index: string]: string }, current) => {
      prev[current[0]] = current[1];
      return prev;
    }, {});

    prevQuery.search = target.search.value;
    setQuery(prevQuery);
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchInput type='text' id='search' />
        <button type='submit'>검색</button>
      </form>
    </SearchContainer>
  );
};
export default SearchBar;

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 20px;
  border: 1px solid black;
`;

const SearchContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
