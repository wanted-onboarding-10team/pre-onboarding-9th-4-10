import { useMemo, useState, FormEvent } from 'react';
import { Table, Column, Header } from '@tanstack/react-table';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Button,
  Input,
  HStack,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from '@chakra-ui/react';
import { CustomTextBtn } from 'components/common/CustomTextBtn';
import { DataResponse } from 'types';

const SearchMenu = ({
  header,
  column,
  table,
}: {
  header: Header<DataResponse, unknown>;
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  const [searchValue, setSearchValue] = useState<string>();

  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  const searchBtnHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    column.setFilterValue(searchValue);
  };

  return (
    <Menu closeOnSelect={false}>
      <CustomTextBtn>
        <>{header.column.columnDef.header}</>
        <MenuButton as={IconButton} aria-label='Options' icon={<SearchIcon />} variant='outline' />
      </CustomTextBtn>
      {typeof firstValue === 'string' ? (
        <MenuList padding={'3'}>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues.slice(0, 5000).map((value: typeof firstValue) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <HStack>
            <form onSubmit={e => searchBtnHandler(e)}>
              <Input
                type='text'
                list={column.id + 'list'}
                value={searchValue as string}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                onChange={e => setSearchValue(e.target.value)}
              />
            </form>
            <Button variant='outline' type='submit'>
              검색
            </Button>
            <Button variant='outline' onClick={() => column.setFilterValue('')}>
              초기화
            </Button>
          </HStack>
        </MenuList>
      ) : (
        <MenuList padding={'3'}>
          <MenuOptionGroup
            defaultValue={'ALL'}
            type='radio'
            onChange={val => {
              val === 'true'
                ? column.setFilterValue(true)
                : val === 'false'
                ? column.setFilterValue(false)
                : column.setFilterValue('');
            }}
          >
            {sortedUniqueValues.slice(0, 5000).map((value: string) => (
              <>
                <MenuItemOption
                  minH='35px'
                  fontSize={'md'}
                  fontWeight={'bold'}
                  value={value.toString()}
                  key={'status key' + value.toString()}
                >
                  {value.toString()}
                </MenuItemOption>
                <MenuDivider marginTop={1} />
              </>
            ))}
            <MenuItemOption value='ALL' minH='35px' fontSize={'md'} fontWeight={'bold'}>
              ALL
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      )}
    </Menu>
  );
};

export default SearchMenu;
