import { MainLayout, OrderTable, Pagination, SearchInput } from 'components';
import { useLoaderData } from 'react-router-dom';
import { OrderDataType } from 'types/order';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  useFilterOrder,
  useIdSortOrder,
  useStatusFilterOrder,
  useTimeSortOrder,
} from 'utils/hooks';
import { SortType } from 'types/sort';
import { MAX_SIZE } from 'shared/Pagination';
import { TODAY } from 'shared/Date';

interface SortOptionType {
  id: SortType;
  time: SortType;
}
const MainPage = () => {
  const orderDataResponse = useLoaderData() as OrderDataType[];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startPage = MAX_SIZE * currentPage - MAX_SIZE;
  const finishPage = MAX_SIZE * currentPage;

  const [orderData, setOrderData] = useState<OrderDataType[]>(orderDataResponse);
  const [searchWord, setSearchWord] = useState<string>('');

  const [sortOption, setSortOption] = useState<SortOptionType>({ id: null, time: null });
  const [filterOption, setFilterOption] = useState<boolean | null>(null);

  useEffect(() => {
    setOrderData(useIdSortOrder(orderData, sortOption.id));
  }, [sortOption.id]);

  useEffect(() => {
    if (sortOption.time !== null) {
      setOrderData(useTimeSortOrder(orderData, sortOption.time));
    }
  }, [sortOption.time]);

  useEffect(() => {
    if (searchWord === '') {
      setCurrentPage(1);
      setOrderData(orderDataResponse);
      return;
    }

    setOrderData(useFilterOrder(orderDataResponse, searchWord));
  }, [searchWord]);

  useEffect(() => {
    if (filterOption !== null) {
      setOrderData(useStatusFilterOrder(orderDataResponse, filterOption));
    }
  }, [filterOption]);

  return (
    <MainLayout>
      <Flex justifyContent='flex-end' width='1200px'>
        <Text fontSize='2xl' as='i' color='gray.500'>
          {TODAY}
        </Text>
      </Flex>

      <SearchInput onSearchWordChange={setSearchWord} />

      <Flex justifyContent='flex-end' width='1200px' gap='20px' fontSize='sm' fontWeight='900'>
        <div>
          <Text
            color={sortOption.time === 'desc' ? 'blue.400' : 'gray.400'}
            cursor='pointer'
            onClick={() => setSortOption(prev => ({ ...prev, time: 'desc' }))}
          >
            최신순
          </Text>
          <Text
            color={sortOption.time === 'asc' ? 'blue.400' : 'gray.400'}
            cursor='pointer'
            onClick={() => setSortOption(prev => ({ ...prev, time: 'asc' }))}
          >
            거래 시간 순
          </Text>
        </div>

        <div>
          <Text
            color={sortOption.id === 'asc' ? 'blue.400' : 'gray.400'}
            cursor='pointer'
            onClick={() => setSortOption(prev => ({ ...prev, id: 'asc' }))}
          >
            번호 오름차순
          </Text>
          <Text
            color={sortOption.id === 'desc' ? 'blue.400' : 'gray.400'}
            cursor='pointer'
            onClick={() => setSortOption(prev => ({ ...prev, id: 'desc' }))}
          >
            번호 내림차순
          </Text>
        </div>

        <div>
          <Text
            color={filterOption ? 'blue.400' : 'gray.400'}
            cursor='pointer'
            onClick={() => setFilterOption(true)}
          >
            주문처리상태 O
          </Text>
          <Text
            color={filterOption === false ? 'blue.400' : 'gray.400'}
            cursor='pointer'
            onClick={() => setFilterOption(false)}
          >
            주문처리상태 X
          </Text>
        </div>
      </Flex>

      <OrderTable data={orderData.slice(startPage, finishPage)} />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.floor(orderData.length / MAX_SIZE)}
        onPageChange={setCurrentPage}
      />
    </MainLayout>
  );
};

export default MainPage;
