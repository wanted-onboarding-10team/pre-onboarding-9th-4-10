import { Flex, Input } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SearchInputProps {
  onSearchWordChange: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ onSearchWordChange }: SearchInputProps) => {
  return (
    <Flex width='1200px'>
      <Input
        placeholder='고객이름을 입력하세요'
        onChange={e => onSearchWordChange(e.target.value)}
        variant='flushed'
      />
    </Flex>
  );
};

export default SearchInput;
