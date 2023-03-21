import React from 'react';
import SearchMenu from './SearchMenu';
import { CustomTextBtn } from 'components/common/CustomTextBtn';
import { DataResponse } from 'types';
import { flexRender, Header, Table } from '@tanstack/react-table';
import { Th } from '@chakra-ui/react';

interface TableProps {
  headers: Header<DataResponse, unknown>[];
  table: Table<DataResponse>;
}

const ColumnsHeaderFilter = ({ headers, table }: TableProps) => {
  return (
    <>
      {headers.map(
        header =>
          header.id !== 'date' && (
            <Th key={header.id}>
              {header.isPlaceholder ? null : (
                <>
                  {header.id === 'id' || header.id === 'time' ? (
                    <CustomTextBtn
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '🔼',
                        desc: '🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </CustomTextBtn>
                  ) : header.id === 'customer_name' || header.id === 'status' ? (
                    <SearchMenu header={header} column={header.column} table={table} />
                  ) : (
                    <CustomTextBtn>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </CustomTextBtn>
                  )}
                </>
              )}
            </Th>
          ),
      )}
    </>
  );
};

export default ColumnsHeaderFilter;
