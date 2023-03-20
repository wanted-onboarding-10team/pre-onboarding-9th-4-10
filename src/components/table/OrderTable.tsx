import styled from 'styled-components';
import { OrderCategory } from 'types';

const OrderTable = ({ orderList }: { orderList: OrderCategory[] | undefined }) => {
  return (
    <Table>
      <Thead>
        <Tr>{orderList && Object.keys(orderList[0]).map(key => <Td key={key}>{key}</Td>)}</Tr>
      </Thead>
      <tbody>
        {orderList &&
          orderList.map(order => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.transaction_time}</Td>
              <Td>{order.status ? '완료' : '미완료'}</Td>
              <Td>{order.customer_id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.currency}</Td>
            </Tr>
          ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;

const Table = styled.table`
  border: 1px solid black;
`;

const Thead = styled.thead`
  font-weight: 700;
`;

const Tr = styled.tr`
  padding: 5px;
  border-bottom: 1px solid black;
`;

const Td = styled.td`
  padding: 5px;
  & + & {
    border-left: 1px solid black;
  }
`;
