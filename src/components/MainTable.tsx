import { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Table as ChakraTable,
  Button,
  Select,
  Input,
  HStack,
  Box,
  Text,
} from '@chakra-ui/react';
import { DataResponse } from 'types';
import SearchMenu from './tables/SearchMenu';
import { CustomTextBtn } from './common';

const MainTable = ({
  data,
  columns,
}: {
  data: DataResponse[];
  columns: ColumnDef<DataResponse, any>[];
}) => {
  const [dateFilter, setDateFilter] = useState('2023-03-08');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  useEffect(() => {
    table.setPageSize(50);
    table.setColumnFilters([{ id: 'date', value: dateFilter }]);
  }, []);

  return (
    <TableContainer overflow={'hidden'}>
      <HStack>
        <Button>Today</Button>
      </HStack>
      <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
        {'<<'}
      </Button>
      <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        {'<'}
      </Button>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        {'>'}
      </Button>
      <Button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </Button>
      <HStack flexDir={'row'} justifyContent='space-around'>
        <Box maxW={'100px'}>
          <Text>
            Page
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
            <span>
              | Go to page:
              <Input
                type='number'
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
            </span>
          </Text>
        </Box>

        <Select
          maxW={'150px'}
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
        <span>{table.getRowModel().rows.length} Rows</span>
      </HStack>
      <ChakraTable variant='simple'>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => {
            const { id, headers } = headerGroup;
            return (
              <Tr key={id}>
                <ThBlock headers={headers} table={table} />
              </Tr>
            );
          })}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default MainTable;

const ThBlock = ({
  headers,
  table,
}: {
  headers: Header<DataResponse, unknown>[];
  table: Table<DataResponse>;
}) => {
  return (
    <>
      {headers.map(header => {
        return (
          <Th key={header.id}>
            {header.isPlaceholder ? null : <ThColButton header={header} table={table} />}
          </Th>
        );
      })}
    </>
  );
};

const ThColButton = ({
  header,
  table,
}: {
  header: Header<DataResponse, unknown>;
  table: Table<DataResponse>;
}) => {
  if (header.id === 'id' || header.id === 'time') {
    return (
      <CustomTextBtn
        {...{
          onClick: header.column.getToggleSortingHandler(),
        }}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: ' 🔼',
          desc: ' 🔽',
        }[header.column.getIsSorted() as string] ?? null}
      </CustomTextBtn>
    );
  }

  if (header.id === 'customer_name') return <SearchMenu column={header.column} table={table} />;

  return (
    <CustomTextBtn>{flexRender(header.column.columnDef.header, header.getContext())}</CustomTextBtn>
  );
};
