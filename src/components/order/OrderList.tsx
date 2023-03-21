import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { Order } from 'types/Order';

interface OrderListParam {
  orderLists: Order[];
}

const pageSize = 50;
const pagingOffset = 10;

const OrderList = ({ orderLists }: OrderListParam) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortKey: string[] = searchParams.getAll('sort');
  const filter = searchParams.get('filter');
  const search = searchParams.get('search');
  let viewDatas =
    filter !== null ? orderLists.filter(order => '' + order.status === filter) : orderLists;
  viewDatas =
    search !== null ? viewDatas.filter(order => order.customer_name === search) : viewDatas;
  sortKey.forEach(sortKey => {
    viewDatas.sort((a, b) =>
      (sortKey === 'id' ? a.id > b.id : a.transaction_time > b.transaction_time) ? -1 : 1,
    );
  });
  const totalOrders = viewDatas ? viewDatas.length - 1 : 0;
  const maxIndex = Math.floor(totalOrders / pageSize) - 1;
  const pagingIndex = parseInt(searchParams.get('page') ?? '1') - 1;
  const startPageIndex = pagingIndex - ((pagingIndex - 1) % 10) - 1;
  const lastPageIndex =
    maxIndex >= startPageIndex + pagingOffset ? startPageIndex + pagingOffset : maxIndex + 1;

  const handlePageMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e;
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  const handlePagePrevIndexs = () => {
    setSearchParams(searchParams => {
      searchParams.set('page', (pagingIndex <= pagingOffset ? 1 : pagingIndex - 10).toString());
      return searchParams;
    });
  };

  const handlePageNextIndexs = () => {
    setSearchParams(searchParams => {
      searchParams.set(
        'page',
        (maxIndex >= pagingIndex + pagingOffset
          ? pagingIndex + pagingOffset
          : maxIndex + 1
        ).toString(),
      );
      return searchParams;
    });
  };

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

  const setSearching = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = e.currentTarget.querySelector('input')?.value;
    setSearchParams(searchParams => {
      searchParams.delete('search');
      if (searchValue) {
        searchParams.set('search', searchValue);
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
            onClick={() => setSortKey('id')}
            backgroundColor={sortKey.includes('id') ? 'gray.300' : 'gray.100'}
          >
            주문번호
          </Button>
          <Button
            onClick={() => setSortKey('transaction_time')}
            backgroundColor={sortKey.includes('transaction_time') ? 'gray.300' : 'gray.100'}
          >
            거래일 & 거래시간
          </Button>
        </Box>
        <Box display={'flex'} gap={2} alignItems='center'>
          <Text>주문 처리 상태</Text>
          <Button
            onClick={() => setFiltering(true)}
            backgroundColor={filter === 'true' ? 'gray.300' : 'gray.100'}
          >
            처리
          </Button>
          <Button
            onClick={() => setFiltering(false)}
            backgroundColor={filter === 'false' ? 'gray.300' : 'gray.100'}
          >
            비처리
          </Button>
        </Box>
      </Flex>
      <form onSubmit={setSearching}>
        <FormControl pb={5} pr={5} display={'flex'} gap={2} justifyContent='flex-end'>
          <Input placeholder='고객 이름을 입력해주세요' w='auto' name='searchCustomer' />
          <Button type='submit'>검색</Button>
        </FormControl>
      </form>
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

      {viewDatas.length > 0 && (
        <Center>
          <Box padding={7}>
            <HStack>
              <Button isDisabled={maxIndex < 10} onClick={handlePagePrevIndexs}>
                &lt;
              </Button>
              {Array.from(new Array(maxIndex + 1), (_, key) => key + 1)
                .slice(startPageIndex, lastPageIndex)
                .map(value => (
                  <Button key={value} value={value} onClick={handlePageMove}>
                    {value}
                  </Button>
                ))}
              <Button isDisabled={maxIndex < 10} onClick={handlePageNextIndexs}>
                &gt;
              </Button>
            </HStack>
          </Box>
        </Center>
      )}
    </>
  );
};

export default OrderList;
