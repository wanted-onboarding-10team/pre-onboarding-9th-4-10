import { useEffect, useState } from 'react';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Box,
  HStack,
  Text,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';
import { DataResponse } from 'types';
import useTable from 'hooks/useTable';
import * as S from './columns/styles';
import ColumnsHeaderFilter from './columns/ColumnsHeader';
import PagenationBar from './columns/PagenationBar';

interface MainTableProps {
  data: DataResponse[];
  columns: ColumnDef<DataResponse, any>[];
}

const MainTable = ({ data, columns }: MainTableProps) => {
  const [dateFilter, setDateFilter] = useState('2023-03-08');
  const [columnVisibility, setColumnVisibility] = useState({});
  const table = useTable({ data, columns });

  useEffect(() => {
    table.setPageSize(50);
    table.setColumnFilters([{ id: 'date', value: dateFilter }]);
    table.setColumnVisibility(columnVisibility);
  }, []);

  return (
    <TableContainer overflow='hidden' test-id='Table-Container'>
      <PagenationBar data={data} columns={columns} table={table} />
      <Box overflowY='auto' maxHeight='60vh'>
        <S.StyleAlineTd>
          <ChakraTable colorScheme='gray'>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  <ColumnsHeaderFilter headers={headerGroup.headers} table={table} />
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <Tr key={row.id}>
                  {row
                    .getVisibleCells()
                    .map(
                      cell =>
                        !cell.id.includes('date') && (
                          <Td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Td>
                        ),
                    )}
                </Tr>
              ))}
            </Tbody>
          </ChakraTable>
        </S.StyleAlineTd>
      </Box>
    </TableContainer>
  );
};

export default MainTable;
