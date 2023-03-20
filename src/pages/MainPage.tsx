import { MainLayout, OrderTable, Pagination, SearchInput } from 'components';
import { useLoaderData } from 'react-router-dom';
import { OrderDataType } from 'types/order';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useGetTodayOrder from 'utils/hooks/useGetTodayOrder';
import { useFilterOrder, useIdSortOrder, useTimeSortOrder } from 'utils/hooks';
import { SortType, TimeSortType } from 'types/sort';
import { MAX_SIZE } from 'shared/Pagination';
import { TODAY } from 'shared/Date';

interface SortOptionType {
  id: SortType;
  time: TimeSortType;
}

const MainPage = () => {
  const orderDataResponse = useLoaderData() as OrderDataType[];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startPage = MAX_SIZE * currentPage - MAX_SIZE;
  const finishPage = MAX_SIZE * currentPage;

  const [orderData, setOrderData] = useState<OrderDataType[]>(orderDataResponse);
  const [searchWord, setSearchWord] = useState<string>('');

  const [sort, setSort] = useState<SortOptionType>({ id: 'asc', time: null });

  // 아이디 정렬
  useEffect(() => {
    setOrderData(useIdSortOrder(orderData, sort.id));
  }, [sort.id]);

  // 날짜 정렬
  useEffect(() => {
    if (sort.time !== null) {
      setOrderData(useTimeSortOrder(orderData, sort.time));
    }
  }, [sort.time]);

  // 검색
  useEffect(() => {
    if (searchWord === '') {
      setCurrentPage(1);
      setOrderData(orderDataResponse);
      return;
    }

    setOrderData(useFilterOrder(orderDataResponse, searchWord));
  }, [searchWord]);

  useEffect(() => {
    setOrderData(useGetTodayOrder(orderData));
  }, []);

  return (
    <MainLayout>
      <SearchInput onSearchWordChange={setSearchWord} />

      <Flex>
        <p>최신순</p>
        <p>거래 시간 순</p>

        <p>번호 오름차순</p>
        <p>번호 내림차순</p>

        <p>주문처리상태</p>
      </Flex>
      <Flex>
        <p>오늘</p>
        <p>{TODAY}</p>
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
