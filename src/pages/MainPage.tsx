import { MainLayout, OrderTable, Pagination, SearchInput } from 'components';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { OrderDataType } from 'types/order';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  useFilterOrder,
  useIdSortOrder,
  useStatusFilterOrder,
  useTimeSortOrder,
} from 'utils/hooks';
import { MAX_SIZE } from 'shared/Pagination';
import { TODAY } from 'shared/Date';
import { SortOptionType } from 'types/sort';
import mainLoader from 'router/loader/mainLoader';

const MainPage = () => {
  const [orderDataResponse, setOrderDataResponse] = useState<OrderDataType[]>(
    useLoaderData() as OrderDataType[],
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startPage = MAX_SIZE * currentPage - MAX_SIZE;
  const finishPage = MAX_SIZE * currentPage;

  const [orderData, setOrderData] = useState<OrderDataType[]>(orderDataResponse);
  const [searchWord, setSearchWord] = useState<string>('');

  const [sortOption, setSortOption] = useState<SortOptionType>({ id: null, time: null });
  const [filterOption, setFilterOption] = useState<boolean | null>(null);

  const [query] = useSearchParams();

  useEffect(() => {
    setOrderData(useIdSortOrder(orderData, sortOption.id));
  }, [sortOption.id]);

  useEffect(() => {
    setCurrentPage(1);
    setOrderData(useTimeSortOrder(orderData, sortOption.time));
  }, [sortOption.time]);

  useEffect(() => {
    if (searchWord === '') {
      setCurrentPage(1);
    }
    setCurrentPage(1);
    setOrderData(useFilterOrder(orderDataResponse, searchWord));
  }, [searchWord]);

  useEffect(() => {
    setOrderData(useStatusFilterOrder(orderDataResponse, filterOption));
  }, [filterOption]);

  useEffect(() => {
    setCurrentPage(Number(query.get('pages')));

    const intervalId = setInterval(async () => {
      const data = await mainLoader();
      setOrderDataResponse(data);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setOrderData(orderDataResponse);
  }, [orderDataResponse]);

  return (
    <MainLayout>
      <Flex justifyContent='flex-end' width='1200px'>
        <Text fontSize='2xl' as='i' color='gray.500'>
          {TODAY}
        </Text>
      </Flex>

      <SearchInput onSearchWordChange={setSearchWord} />

      <OrderTable
        data={orderData.slice(startPage, finishPage)}
        setSortOption={setSortOption}
        setFilterOption={setFilterOption}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(orderData.length / MAX_SIZE)}
        onPageChange={setCurrentPage}
      />
    </MainLayout>
  );
};

export default MainPage;
