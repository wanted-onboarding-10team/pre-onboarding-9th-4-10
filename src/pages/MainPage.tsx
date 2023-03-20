import { Order } from 'components';
import { useLoaderData } from 'react-router-dom';
import { OrderDataType } from 'types/order';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const MainPage = () => {
  const orderData = useLoaderData() as OrderDataType[];
  console.log(orderData);
  return (
    <TableContainer width='1200px'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>주문번호</Th>
            <Th>거래시간</Th>
            <Th>주문처리상태</Th>
            <Th>고객번호</Th>
            <Th>고객이름</Th>
            <Th>가격</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderData.map(v => (
            <Order {...v} key={v.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MainPage;
