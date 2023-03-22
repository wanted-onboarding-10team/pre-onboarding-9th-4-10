import { Table } from '@tanstack/react-table';
import { Select, HStack, Box, Tag, VStack, Button } from '@chakra-ui/react';
import {
  LeftArrowOnceIcon,
  LeftArrowTwice,
  RightArrowTwiceIcon,
  RightArrowOnceIcon,
} from 'components/common/CreateSVGIcon';
import * as Custom from 'components/common/CustomBtn';
import { DataResponse } from 'types';

const PagenationBar = ({
  table,
  onResetFilterHandler,
}: {
  table: Table<DataResponse>;
  onResetFilterHandler: () => void;
}) => {
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const maxPageIdx = pageCount - 1;

  const onNextPageHandler = () => {
    pageIndex < maxPageIdx ? table.nextPage() : table.setPageIndex(maxPageIdx);
  };

  return (
    <>
      <HStack flexDir='row' justifyContent='space-around'>
        <VStack align='center'>
          <HStack gap='1'>
            <Custom.IconBtn
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label=''
              icon={<LeftArrowTwice minW='50px' />}
            />
            <Custom.IconBtn
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label=''
              icon={<LeftArrowOnceIcon />}
            />
            <strong>
              {pageIndex + 1} / {pageCount}
            </strong>
            <Custom.IconBtn
              onClick={() => onNextPageHandler()}
              disabled={!table.getCanNextPage()}
              aria-label=''
              icon={<RightArrowOnceIcon />}
            />
            <Custom.IconBtn
              onClick={() => table.setPageIndex(maxPageIdx)}
              disabled={!table.getCanNextPage()}
              aria-label=''
              icon={<RightArrowTwiceIcon minW='50px' />}
            />
          </HStack>
          <HStack>
            {[...new Array(pageCount)].map(
              (e, idx) =>
                idx < 6 && (
                  <Custom.TagGray
                    fontWeight='bold'
                    key={idx}
                    onClick={() => table.setPageIndex(idx)}
                    cursor='pointer'
                    bg={pageIndex === idx ? 'gray.300' : 'gray.100'}
                  >
                    {idx + 1}
                  </Custom.TagGray>
                ),
            )}
          </HStack>
        </VStack>
        <Box flex='1' />
        <HStack>
          <Box flex='1' />
          <Button onClick={() => onResetFilterHandler()} color='gray.500' fontWeight='bold'>
            모든 필터 초기화
          </Button>
        </HStack>
        <HStack gap='5px'>
          <Select
            maxW={'150px'}
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {/* Visible Row Count Option */}
            {[50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
    </>
  );
};

export default PagenationBar;
