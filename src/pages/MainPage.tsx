import { MainLayout, OrderTable, Pagination, SearchInput } from 'components';
import { useLoaderData } from 'react-router-dom';
import { OrderDataType } from 'types/order';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// 페이지 최대 한도
const MAX_SIZE = 50;
const TODAY = new Date('2023.03.08').toDateString();

const MainPage = () => {
  const orderDataResponse = useLoaderData() as OrderDataType[];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startPage = MAX_SIZE * currentPage - MAX_SIZE;
  const finishPage = MAX_SIZE * currentPage;

  const [orderData, setOrderData] = useState<OrderDataType[]>(
    orderDataResponse.filter(v => new Date(v.transaction_time).toDateString() === TODAY),
  );

  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isDateAscending, setIsDateAscending] = useState<boolean | null>(null);

  const [searchWord, setSearchWord] = useState<string>('');

  // 아이디 정렬
  useEffect(() => {
    if (!isAscending) {
      setOrderData(orderData.sort((a, b) => a.id - b.id));
    } else {
      setOrderData(orderData.sort((a, b) => b.id - a.id));
    }
  }, [isAscending]);

  // 날짜 정렬
  useEffect(() => {
    if (isDateAscending !== null) {
      const sortedData = orderData.sort((a, b) => {
        if (!isDateAscending) {
          return new Date(a.transaction_time).getTime() - new Date(b.transaction_time).getTime();
        } else {
          return new Date(b.transaction_time).getTime() - new Date(a.transaction_time).getTime();
        }
      });

      setOrderData(sortedData);
    }
  }, [isDateAscending]);

  // 검색
  useEffect(() => {
    if (searchWord === '') {
      setCurrentPage(1);
      setOrderData(orderDataResponse);
      return;
    }

    const filteredData = orderDataResponse.filter(v =>
      v.customer_name.toLowerCase().includes(searchWord.toLowerCase()),
    );
    setOrderData(filteredData);
  }, [searchWord]);

  return (
    <MainLayout>
      <SearchInput onSearchWordChange={setSearchWord} />

      <Flex>
        <p>최근순</p>
        <p>오래된순</p>

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
        totalPages={parseInt((orderData.length / MAX_SIZE).toString())}
        onPageChange={setCurrentPage}
      />
    </MainLayout>
  );
};

export default MainPage;
