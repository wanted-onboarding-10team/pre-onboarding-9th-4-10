import { useMemo, useState } from 'react';
import { Table, Column } from '@tanstack/react-table';
import { SearchIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, IconButton, Button, Input, HStack } from '@chakra-ui/react';
import { CustomTextBtn } from 'components/common/CustomTextBtn';
import { DataResponse } from 'types';

const SearchMenu = ({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  const [searchValue, setSearchValue] = useState('');

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  const searchBtnHandler = () => {
    column.setFilterValue(searchValue);
  };

  return (
    <Menu closeOnSelect={false}>
      <CustomTextBtn>
        고객 이름
        <MenuButton as={IconButton} aria-label='Options' icon={<SearchIcon />} variant='outline' />
      </CustomTextBtn>

      <MenuList>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <HStack padding={'3'}>
          <Input
            type='text'
            value={searchValue as string}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            list={column.id + 'list'}
            onChange={e => setSearchValue(e.target.value)}
          />
          <Button variant='outline' onClick={searchBtnHandler}>
            검색
          </Button>
        </HStack>
      </MenuList>
    </Menu>
  );
};

export default SearchMenu;
