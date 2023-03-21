import { DataResponse } from 'types';
import { ColumnDef, Table } from '@tanstack/react-table';
import { Button, Select, Input, HStack, Box, Text } from '@chakra-ui/react';

const PagenationBar = ({
  data,
  columns,
  table,
}: {
  data: DataResponse[];
  columns: ColumnDef<DataResponse, any>[];
  table: Table<DataResponse>;
}) => {
  return (
    <>
      <HStack>
        <Text fontSize={'2xl'}>
          <strong>Today : 2023-03-08 </strong>
        </Text>
        <Button onClick={() => table.setColumnFilters([{ id: 'date', value: '2023-03-08' }])}>
          모든 필터 초기화
        </Button>
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
    </>
  );
};

export default PagenationBar;
