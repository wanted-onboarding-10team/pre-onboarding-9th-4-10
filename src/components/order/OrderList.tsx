import { Box, Button, Center, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { Order } from 'types/Order';

interface OrderListParam {
  orderLists: Order[];
}

const pageSize = 50;
const pagingOffset = 10;

const OrderList = ({ orderLists }: OrderListParam) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalOrders = orderLists ? orderLists.length - 1 : 0;
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

  return (
    <>
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
          {orderLists.slice(pageSize * pagingIndex, pageSize * pagingIndex + pageSize).map(item => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.transaction_time}</Td>
              {item.status ? <Td>처리</Td> : <Td color='red.300'>비처리</Td>}
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
