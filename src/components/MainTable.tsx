import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataResponse } from 'types';
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Table,
  Button,
  Select,
  Input,
} from '@chakra-ui/react';
import { useEffect } from 'react';

const MainTable = ({
  data,
  columns,
}: {
  data: DataResponse[];
  columns: ColumnDef<DataResponse, any>[];
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    table.setPageSize(50);
  }, []);

  return (
    <TableContainer overflow={'hidden'}>
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
      <span>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
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
      <div>{table.getRowModel().rows.length} Rows</div>
      <Table variant='simple'>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
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
      </Table>
    </TableContainer>
  );
};

export default MainTable;
