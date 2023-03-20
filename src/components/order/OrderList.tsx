import {
  Box,
  Button,
  Center,
  HStack,
  Select,
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
  const init: { [key: string]: Order[] } = {};
  const orderListsBytransactionDate = orderLists.reduce((prev, curr) => {
    const dateTime = curr.transaction_time.split(' ');
    prev[dateTime[0]] = prev[dateTime[0]] || [];
    prev[dateTime[0]].push(curr);
    return prev;
  }, init);
  const existTransactionDates = Object.keys(orderListsBytransactionDate).sort();
  const selectedDate = searchParams.get('date') ?? '2023-03-08';

  const orderListsByDate = orderListsBytransactionDate[selectedDate];

  const totalOrders = orderListsByDate ? orderListsByDate.length - 1 : 0;
  const maxIndex = Math.floor(totalOrders / pageSize) - 1;
  const pagingIndex = parseInt(searchParams.get('page') ?? '1') - 1;
  const startPageIndex = pagingIndex - ((pagingIndex - 1) % 10) - 1;
  const lastPageIndex =
    maxIndex >= startPageIndex + pagingOffset ? startPageIndex + pagingOffset : maxIndex + 1;
  const handlePageMove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {
      currentTarget: { value },
    } = event;
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

  const chageDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(searchParams => {
      searchParams.delete('page');
      searchParams.set('date', event.target.value);
      return searchParams;
    });
  };

  return (
    <>
      <Box display={'flex'} flexDirection='column' alignItems='end' padding={5} gap={5}>
        <Box display={'flex'} flexDirection='row' alignItems='center'>
          <Text width={20} textAlign='right' pr={2}>
            거래일 :{' '}
          </Text>
          <Select maxWidth={150} onChange={chageDate} defaultValue={selectedDate}>
            {existTransactionDates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>주문 건 : {orderListsByDate.length} 건</Text>
        </Box>
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
          {orderListsByDate
            .slice(pageSize * pagingIndex, pageSize * pagingIndex + pageSize)
            .map(item => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.transaction_time}</Td>
                <Td>{item.status ? '처리' : '비처리'}</Td>
                <Td>{item.customer_id}</Td>
                <Td>{item.customer_name}</Td>
                <Td>{item.currency}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
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
    </>
  );
};

export default OrderList;
