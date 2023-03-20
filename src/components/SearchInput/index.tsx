import { Flex, Input } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SearchInputProps {
  onSearchWordChange: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ onSearchWordChange }: SearchInputProps) => {
  return (
    <Flex>
      <Input placeholder='검색어를 입력하세요' onChange={e => onSearchWordChange(e.target.value)} />
    </Flex>
  );
};

export default SearchInput;
