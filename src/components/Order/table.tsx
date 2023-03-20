import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { OrderItem } from 'components';
import { OrderDataType } from 'types/order';

const OrderTable = ({ data }: { data: OrderDataType[] }) => (
  <TableContainer width='1200px' minHeight='700px'>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>주문번호</Th>
          <Th>거래시간</Th>
          <Th textAlign='center'> 주문처리상태</Th>
          <Th textAlign='center'>고객번호</Th>
          <Th>고객이름</Th>
          <Th>가격</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.length !== 0 ? (
          data.map(v => <OrderItem {...v} key={v.id} />)
        ) : (
          <p>해당하는 데이터가 없습니다.</p>
        )}
      </Tbody>
    </Table>
  </TableContainer>
);

export default OrderTable;
