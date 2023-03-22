import { useMemo, useState, FormEvent } from 'react';
import { Table, Column, Header } from '@tanstack/react-table';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Input,
  HStack,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import * as Custom from 'components/common/CustomBtn';
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

  const onFilterinitialization = () => {
    setSearchValue('');
    column.setFilterValue('');
  };

  return (
    <Menu closeOnSelect={false}>
      <Custom.TextBtn>
        <>{header.column.columnDef.header}</>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          size='sm'
          marginBottom='1'
          icon={<SearchIcon />}
          variant='outline'
          marginLeft='3'
        />
      </Custom.TextBtn>

      {typeof firstValue === 'string' ? (
        <MenuList padding='3'>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues
              .slice(0, sortedUniqueValues.length - 1)
              .map((value: typeof firstValue) => (
                <option value={value} key={'option' + value} />
              ))}
          </datalist>
          <form onSubmit={e => searchBtnHandler(e)}>
            <HStack>
              <Input
                type='text'
                list={column.id + 'list'}
                value={searchValue as string}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                onChange={e => setSearchValue(e.target.value)}
              />

              <Custom.Btn type='submit'>검색</Custom.Btn>
              <Custom.Btn onClick={onFilterinitialization}>초기화</Custom.Btn>
            </HStack>
          </form>
        </MenuList>
      ) : (
        <MenuList padding='3'>
          <MenuOptionGroup
            defaultValue='ALL'
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
              <MenuItemOption
                minH='35px'
                fontSize='md'
                fontWeight='bold'
                value={value.toString()}
                key={'status key' + value.toString()}
              >
                {value.toString()}
              </MenuItemOption>
            ))}
            <MenuItemOption minH='35px' fontSize='md' fontWeight='bold' value='ALL'>
              ALL
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      )}
    </Menu>
  );
};

export default SearchMenu;
