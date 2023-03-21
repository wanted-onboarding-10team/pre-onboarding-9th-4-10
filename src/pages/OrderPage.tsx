import { AbsoluteCenter, Box, Container, Heading, Select, Spinner, Text } from '@chakra-ui/react';
import OrderList from 'components/order/OrderList';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Order } from 'types/Order';
import { getOrders } from 'utils/api/order';

const OrderPage = () => {
  const { isLoading, data } = useQuery<Order[]>('orders', getOrders);
  const [searchParams, setSearchParams] = useSearchParams();
  const init: { [key: string]: Order[] } = {};

  const orderListsBytransactionDate = data
    ? data.reduce((prev, curr) => {
        const dateTime = curr.transaction_time.split(' ');
        prev[dateTime[0]] = prev[dateTime[0]] || [];
        prev[dateTime[0]].push(curr);
        return prev;
      }, init)
    : {};
  const existTransactionDates = Object.keys(orderListsBytransactionDate).sort();
  // TODO: '2023-03-08' 하드코딩 제거
  const selectedDate = searchParams.get('date') ?? '2023-03-08';
  const orderListsByDate = orderListsBytransactionDate[selectedDate];

  const changeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(searchParams => {
      searchParams.delete('page');
      searchParams.set('date', event.target.value);
      return searchParams;
    });
  };

  return (
    <Container maxW='container.xl' padding={30}>
      <Heading mb={15}>주문 목록 페이지</Heading>
      {isLoading ? (
        <Box position='relative' h='100px'>
          <AbsoluteCenter p='4' color='white' axis='both'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </AbsoluteCenter>
        </Box>
      ) : data ? (
        <>
          <Box display={'flex'} flexDirection='column' alignItems='end' p={5}>
            <Box display={'flex'} flexDirection='row' alignItems='center'>
              <Text width={20} textAlign='right' pr={2}>
                거래일 :
              </Text>
              <Select maxWidth={150} onChange={changeDate} defaultValue={selectedDate}>
                {existTransactionDates.map(date => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          <OrderList orderLists={orderListsByDate} />
        </>
      ) : null}
    </Container>
  );
};

export default OrderPage;
