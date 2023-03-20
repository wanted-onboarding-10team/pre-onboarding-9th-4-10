import { Th, Tr } from '@chakra-ui/react';
import { OrderDataType } from 'types/order';

const Order = ({
  id,
  currency,
  customer_id,
  customer_name,
  transaction_time,
  status,
}: OrderDataType) => {
  return (
    <Tr>
      <Th color='blue.400'>{id}</Th>
      <Th>{transaction_time}</Th>
      <Th textAlign='center'>{status ? 'O' : 'X'}</Th>
      <Th textAlign='center'>{customer_id}</Th>
      <Th>{customer_name}</Th>
      <Th color='red.400'>{currency}</Th>
    </Tr>
  );
};

export default Order;
