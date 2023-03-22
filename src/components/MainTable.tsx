import { createContext, useEffect, useState } from 'react';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';
import useTable from 'hooks/useTable';
import * as S from 'components/styles';
import * as Custom from 'components/common/CustomBtn';
import ColumnsHeaderFilter from 'components/columns/ColumnsHeaderFilter';
import PagenationBar from 'components/columns/PagenationBar';
import { FILTER_DATE } from 'types/constans';
import { DataResponse } from 'types';
interface MainTableProps {
  data: DataResponse[];
  columns: ColumnDef<DataResponse, any>[];
}
export const GlobalFilterContext = createContext(false);
export const initialFilter = { id: 'date', value: FILTER_DATE.TODAY } as const;

const MainTable = ({ data, columns }: MainTableProps) => {
  const [tableFilter, setTableFilter] = useState(initialFilter);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isFilterReset, setIsFilterRest] = useState(false);

  const table = useTable({ data, columns });

  useEffect(() => {
    table.setPageSize(50);
    table.setColumnFilters([tableFilter]);
    table.setColumnVisibility(columnVisibility);
  }, []);

  const onResetFilterHandler = () => {
    table.setColumnFilters([initialFilter]);
    setIsFilterRest(true);
    setTimeout(() => setIsFilterRest(false), 1000);
  };

  return (
    <TableContainer test-id='Table-Container' overflow='hidden' height='75vh'>
      <Custom.TagGray marginBottom='8'>
        <strong>Today :</strong>
        <Text fontWeight='md'> &nbsp;{tableFilter.value}</Text>
      </Custom.TagGray>
      <PagenationBar table={table} onResetFilterHandler={onResetFilterHandler} />
      <Divider marginTop='20px' orientation='horizontal' />
      <Box overflowY='auto' height='60vh'>
        <S.StyleAlineTd>
          <ChakraTable colorScheme='gray'>
            <GlobalFilterContext.Provider value={isFilterReset}>
              <Thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <Tr key={headerGroup.id}>
                    <ColumnsHeaderFilter headers={headerGroup.headers} table={table} />
                  </Tr>
                ))}
              </Thead>
            </GlobalFilterContext.Provider>
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
