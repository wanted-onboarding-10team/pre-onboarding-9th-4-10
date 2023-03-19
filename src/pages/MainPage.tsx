import { useMemo } from 'react';
import useOrderList from 'hooks/useOrderList';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Thead, Tbody, Tr, Th, Td, TableContainer, Table } from '@chakra-ui/react';
import { DataResponse } from 'types';

const columnHelper = createColumnHelper<DataResponse>();
const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('customer_id', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('customer_name', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('currency', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    cell: info => info.getValue().toString(),
  }),
  columnHelper.accessor('transaction_time', {
    cell: info => info.getValue(),
  }),
];

const MainPage = () => {
  const { data: orders, isLoading, status, isFetching } = useOrderList();
  console.log(status, isFetching);

  const data = useMemo(() => {
    return orders;
  }, [orders]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading || !data || isFetching) {
    return <div>로딩중..</div>;
  }

  return (
    <TableContainer>
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

export default MainPage;
