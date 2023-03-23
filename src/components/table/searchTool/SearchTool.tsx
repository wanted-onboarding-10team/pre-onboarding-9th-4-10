import FilterButton from 'components/table/searchTool/tool/FilterButton';
import SearchBar from 'components/table/searchTool/tool/SearchBar';
import { Flex } from '@chakra-ui/react';

const SearchTool = () => {
  return (
    <Flex width='1200px' margin='30px auto' justifyContent='space-between'>
      <SearchBar />
      <FilterButton />
    </Flex>
  );
};

export default SearchTool;
