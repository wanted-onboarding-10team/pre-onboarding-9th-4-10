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
} from '@chakra-ui/react';
import useTable from 'hooks/useTable';
import * as S from 'components/styles';
import ColumnsHeaderFilter from 'components/columns/ColumnsHeaderFilter';
import PagenationBar from 'components/columns/PagenationBar';
import { DataResponse } from 'types';
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
    <>
      <HStack>
        <Text fontSize={'2xl'} marginBottom='5'>
          <strong>Today : 2023-03-08 </strong>
        </Text>
        <Box flex='1' />
        <Button onClick={() => table.setColumnFilters([{ id: 'date', value: '2023-03-08' }])}>
          모든 필터 초기화
        </Button>
      </HStack>
      <TableContainer overflow='hidden' test-id='Table-Container'>
        <PagenationBar table={table} />
        <Box overflowY='auto' height='60vh'>
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
    </>
  );
};

export default MainTable;
