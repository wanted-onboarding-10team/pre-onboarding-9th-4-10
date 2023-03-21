import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { OrderItem } from 'components';
import { Dispatch, SetStateAction } from 'react';
import { OrderDataType } from 'types/order';
import { SortOptionType } from 'types/sort';

interface OrderTableProps {
  data: OrderDataType[];
  setSortOption: Dispatch<SetStateAction<SortOptionType>>;
  setFilterOption: Dispatch<SetStateAction<boolean | null>>;
}

const OrderTable = ({ data, setSortOption, setFilterOption }: OrderTableProps) => {
  return (
    <TableContainer width='1200px' minHeight='700px'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th
              cursor='pointer'
              onClick={() =>
                setSortOption(prev => ({
                  ...prev,
                  id: prev.id === 'asc' || null ? 'desc' : 'asc',
                }))
              }
            >
              주문번호
            </Th>
            <Th
              cursor='pointer'
              onClick={() =>
                setSortOption(prev => ({
                  ...prev,
                  time: prev.time === 'asc' || null ? 'desc' : 'asc',
                }))
              }
            >
              거래시간
            </Th>
            <Th textAlign='center' cursor='pointer' onClick={() => setFilterOption(prev => !prev)}>
              주문처리상태
            </Th>
            <Th textAlign='center'>고객번호</Th>
            <Th>고객이름</Th>
            <Th>가격</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length !== 0 ? (
            data.map(v => <OrderItem {...v} key={v.id} />)
          ) : (
            <Tr>
              <Th>해당하는 데이터가 없습니다.</Th>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
