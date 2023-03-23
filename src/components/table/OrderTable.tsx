import { Table, TableContainer, Td, Thead, Tr } from '@chakra-ui/react';
import { orderKeys } from 'constants/orderKeys';
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
            {orderKeys.map(header => {
              return header.sortable ? (
                <Td onClick={() => handleAlignQuery(header.key)} key={header.key}>
                  {header.displayName}
                  {query.get('align') === header.key ? '▼' : '▲'}
                </Td>
              ) : (
                <Td key={header.key}>{header.displayName}</Td>
              );
            })}
          </Tr>
        </Thead>
        <tbody>
          {orderList &&
            orderList.map(order => (
              <Tr key={order.id}>
                {orderKeys.map(prop => {
                  return prop.displayType ? (
                    <Td key={prop.key}>{prop.displayType(order[prop.key])}</Td>
                  ) : (
                    <Td key={prop.key}>{order[prop.key]}</Td>
                  );
                })}
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
