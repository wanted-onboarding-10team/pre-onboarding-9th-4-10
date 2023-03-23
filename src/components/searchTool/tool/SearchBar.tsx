import { Button, Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  useEffect(() => {
    setSearchString(query.get('search') || '');
  }, []);
  return (
    <form onSubmit={handleSearch} data-testid='search-form'>
      <Flex>
        <Input
          width='300px'
          type='text'
          id='search'
          aria-label='search-input'
          data-testid='search-input'
          value={searchString}
          onChange={handleChange}
          variant='flushed'
        />
        <Button type='submit'>검색</Button>
      </Flex>
    </form>
  );
};
export default SearchBar;
