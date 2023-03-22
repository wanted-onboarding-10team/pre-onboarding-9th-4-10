import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = () => {
  const [query, setQuery] = useSearchParams();
  const [searchString, setSearchString] = useState<string>('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prevQuery = Array.from(query).reduce((prev: { [index: string]: string }, current) => {
      prev[current[0]] = current[1];
      return prev;
    }, {});

    prevQuery.search = searchString;
    setQuery(prevQuery);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch} data-testid='search-form'>
        <SearchInput
          type='text'
          id='search'
          aria-label='search-input'
          value={searchString}
          onChange={handleChange}
        />
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
