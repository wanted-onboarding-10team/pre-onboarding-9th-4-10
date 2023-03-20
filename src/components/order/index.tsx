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
      <Th>{id}</Th>
      <Th>{transaction_time}</Th>
      <Th>{status ? 'O' : 'X'}</Th>
      <Th>{customer_id}</Th>
      <Th>{customer_name}</Th>
      <Th>{currency}</Th>
    </Tr>
  );
};

export default Order;
