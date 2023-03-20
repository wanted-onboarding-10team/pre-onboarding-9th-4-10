import { AbsoluteCenter, Box, Container, Heading, Spinner } from '@chakra-ui/react';
import OrderList from 'components/order/OrderList';
import { useQuery } from 'react-query';
import { Order } from 'types/Order';
import { getOrders } from 'utils/api/order';

const OrderPage = () => {
  const { isLoading, data } = useQuery<Order[]>('orders', getOrders);

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
        <OrderList orderLists={data} />
      ) : null}
    </Container>
  );
};

export default OrderPage;
