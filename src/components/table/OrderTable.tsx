import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
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
    <Table>
      <Thead>
        <Tr>
          {orderList &&
            Object.keys(orderList[0]).map(key => {
              if (key === 'id' || key === 'transaction_time') {
                return (
                  <Td onClick={() => handleAlignQuery(key)} key={key} aligns={true}>
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
  ) : (
    <div>결과가없습니다</div>
  );
};

export default OrderTable;

const Table = styled.table`
  border: 1px solid black;
  width: 100%;
  text-align: center;
`;

const Thead = styled.thead`
  font-weight: 700;
`;

const Tr = styled.tr`
  border-bottom: 1px solid black;
`;

const Td = styled.td<{ aligns?: boolean }>`
  padding: 5px 0;
  cursor: ${props => props.aligns && 'pointer'};
  & + & {
    border-left: 1px solid black;
  }
`;
