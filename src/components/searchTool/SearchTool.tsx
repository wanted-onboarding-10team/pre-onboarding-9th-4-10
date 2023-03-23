import { Flex } from '@chakra-ui/react';
import { FilterButton, SearchBar } from 'components';

const SearchTool = () => {
  return (
    <Flex width='1200px' margin='30px auto' justifyContent='space-between'>
      <SearchBar />
      <FilterButton />
    </Flex>
  );
};

export default SearchTool;
