import { MainLayout, Order, Pagination } from 'components';
import { useLoaderData } from 'react-router-dom';
import { OrderDataType } from 'types/order';
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const MAX_SIZE = 50;

const MainPage = () => {
  const orderData = useLoaderData() as OrderDataType[];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startPage = MAX_SIZE * currentPage - MAX_SIZE;
  const finishPage = MAX_SIZE * currentPage;

  console.log(startPage, finishPage, currentPage);

  const [test, setTest] = useState<OrderDataType[]>(orderData.slice(startPage, finishPage));
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isDateAscending, setIsDateAscending] = useState<boolean | null>(null);

  useEffect(() => setTest(orderData.slice(startPage, finishPage)), [startPage, finishPage]);

  useEffect(() => {
    if (!isAscending) {
      setTest(test.sort((a, b) => a.id - b.id));
    } else {
      setTest(test.sort((a, b) => b.id - a.id));
    }
  }, [isAscending]);

  useEffect(() => {
    if (isDateAscending !== null) {
      const sortedData = test.sort((a, b) => {
        if (!isDateAscending) {
          return new Date(a.transaction_time).getTime() - new Date(b.transaction_time).getTime();
        } else {
          return new Date(b.transaction_time).getTime() - new Date(a.transaction_time).getTime();
        }
      });

      setTest(sortedData);
    }
  }, [isDateAscending]);

  return (
    <MainLayout>
      <TableContainer width='1200px'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th onClick={() => setIsAscending(!isAscending)} cursor={'pointer'}>
                주문번호 {isAscending ? '(오름차순)' : '(내림차순)'}
              </Th>
              <Th onClick={() => setIsDateAscending(!isDateAscending)} cursor={'pointer'}>
                거래시간
                {isDateAscending !== null && (isDateAscending ? '(오름차순)' : '(내림차순)')}
              </Th>
              <Th textAlign='center'> 주문처리상태</Th>
              <Th textAlign='center'>고객번호</Th>
              <Th>고객이름</Th>
              <Th>가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {test.map(v => (
              <Order {...v} key={v.id} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={orderData.length / MAX_SIZE}
        onPageChange={setCurrentPage}
      />
    </MainLayout>
  );
};

export default MainPage;
