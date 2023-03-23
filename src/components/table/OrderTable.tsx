import { Table, TableContainer, Td, Thead, Tr } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { OrderCategory } from 'types';

const OrderTable = ({ orderList }: { orderList: OrderCategory[] | undefined }) => {
  const [query, setQuery] = useSearchParams();

  const handleAlignQuery = (key: string) => {
    const prevQuery = Array.from(query).reduce((prev: { [index: string]: string }, current) => {
      prev[current[0]] = current[1];
      return prev;
    }, {});

    if (prevQuery.align === key) {
      delete prevQuery.align;
    } else {
      prevQuery.align = key;
    }

    setQuery(prevQuery);
  };

  return orderList?.length !== 0 ? (
    <TableContainer width='1200px' margin='0 auto' height='800px' overflowY='scroll'>
      <Table variant='simple'>
        <Thead>
          <Tr fontWeight='bold'>
            {orderList &&
              Object.keys(orderList[0]).map(key => {
                if (key === 'id' || key === 'transaction_time') {
                  return (
                    <Td onClick={() => handleAlignQuery(key)} key={key} cursor='pointer'>
                      {key}
                      {query.get('align') === key ? '▼' : '▲'}
                    </Td>
                  );
                } else {
                  return <Td key={key}>{key}</Td>;
                }
              })}
          </Tr>
        </Thead>
        <tbody>
          {orderList &&
            orderList.map(order => (
              <Tr key={order.id}>
                <Td fontWeight='bold'>{order.id}</Td>
                <Td>{order.transaction_time}</Td>
                <Td color={order.status ? 'blue.400' : 'red.400'}>
                  {order.status ? '완료' : '미완료'}
                </Td>
                <Td>{order.customer_id}</Td>
                <Td>{order.customer_name}</Td>
                <Td>{order.currency}</Td>
              </Tr>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  ) : (
    <div>결과가없습니다</div>
  );
};

export default OrderTable;
