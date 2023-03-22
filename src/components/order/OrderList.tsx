import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import OrderSearch from 'components/order/OrderSearch';
import Paging from 'components/order/Paging';
import { useSearchParams } from 'react-router-dom';
import { Order } from 'types/Order';

interface OrderListParam {
  orderLists: Order[];
}

const filterDatasByStatus = (datas: Order[], filter: string | null) => {
  return filter !== null ? datas.filter(order => '' + order.status === filter) : datas;
};

const searchDatasByCustomerName = (datas: Order[], search: string | null) => {
  return search !== null
    ? datas.filter(order => order.customer_name.toLowerCase().includes(search.trim().toLowerCase()))
    : datas;
};

const pageSize = 50;

const OrderList = ({ orderLists }: OrderListParam) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortKey: string[] = searchParams.getAll('sort');
  const filter = searchParams.get('filter');
  const search = searchParams.get('search');

  let viewDatas = filterDatasByStatus(orderLists, filter);
  viewDatas = searchDatasByCustomerName(viewDatas, search);

  sortKey.forEach(sortKey => {
    viewDatas.sort((a, b) =>
      (sortKey === 'id' ? a.id > b.id : a.transaction_time > b.transaction_time) ? -1 : 1,
    );
  });

  const totalOrders = viewDatas ? viewDatas.length - 1 : 0;
  const maxIndex =
    Math.floor(totalOrders / pageSize) - 1 > 0 ? Math.floor(totalOrders / pageSize) - 1 : 0;
  const pagingIndex = parseInt(searchParams.get('page') ?? '1') - 1;

  const setSortKey = (key: string) => {
    const newSortKey = sortKey.includes(key)
      ? sortKey.filter(value => value !== key)
      : [...sortKey, key];
    searchParams.delete('sort');
    newSortKey.forEach(key => {
      searchParams.append('sort', key);
    });
    setSearchParams(searchParams);
  };

  const setFiltering = (status: boolean) => {
    setSearchParams(searchParams => {
      if (filter === '' + status) {
        searchParams.delete('filter');
      } else {
        searchParams.set('filter', '' + status);
      }
      return searchParams;
    });
  };

  return (
    <>
      <Flex
        mt={5}
        mb={5}
        p={6}
        width='inherit'
        justifyContent='space-evenly'
        bgColor='gray.50'
        alignItems='center'
        borderRadius={5}
        borderWidth='1px'
      >
        <Box display={'flex'} gap={2} alignItems='center'>
          <Text>정렬</Text>
          <Button
            borderWidth='1px'
            onClick={() => setSortKey('id')}
            backgroundColor={sortKey.includes('id') ? 'gray.400' : 'gray.100'}
            name='id'
          >
            주문번호
          </Button>
          <Button
            borderWidth='1px'
            onClick={() => setSortKey('transaction_time')}
            name='transaction_time'
            backgroundColor={sortKey.includes('transaction_time') ? 'gray.400' : 'gray.100'}
          >
            거래일 & 거래시간
          </Button>
        </Box>
        <Box display={'flex'} gap={2} alignItems='center'>
          <Text>주문 처리 상태</Text>
          <Button
            borderWidth='1px'
            onClick={() => setFiltering(true)}
            backgroundColor={filter === 'true' ? 'gray.400' : 'gray.100'}
          >
            처리
          </Button>
          <Button
            borderWidth='1px'
            onClick={() => setFiltering(false)}
            backgroundColor={filter === 'false' ? 'gray.400' : 'gray.100'}
          >
            비처리
          </Button>
        </Box>
      </Flex>
      <OrderSearch />
      <Box pb={5} pr={5}>
        <Text textAlign={'right'}>주문 건 : {viewDatas.length} 건</Text>
      </Box>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>주문번호</Th>
            <Th>거래 시간</Th>
            <Th>주문처리상태</Th>
            <Th>고객번호</Th>
            <Th>고객이름</Th>
            <Th>가격</Th>
          </Tr>
        </Thead>
        <Tbody>
          {viewDatas.length > 0 ? (
            viewDatas.slice(pageSize * pagingIndex, pageSize * pagingIndex + pageSize).map(item => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.transaction_time}</Td>
                {item.status ? <Td>처리</Td> : <Td color='red.300'>비처리</Td>}
                <Td>{item.customer_id}</Td>
                <Td>{item.customer_name}</Td>
                <Td>{item.currency}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6}>주문 건이 존재하지 않습니다.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {viewDatas.length > 0 && <Paging maxIndex={maxIndex} pagingIndex={pagingIndex} />}
    </>
  );
};

export default OrderList;
