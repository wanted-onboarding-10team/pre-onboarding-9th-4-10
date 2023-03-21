import styled from 'styled-components';
import { TableHeader, TableBody } from 'components';
import { OrderData } from 'types';

const Table = ({ paginatedData }: { paginatedData?: OrderData[] }) => {
  return (
    <TableBox>
      <TableHeader />
      <tbody>
        {paginatedData?.map((order: OrderData) => {
          return <TableBody order={order} key={order.id} />;
        })}
      </tbody>
    </TableBox>
  );
};
export default Table;

const TableBox = styled.table`
  width: 800px;
  background-color: #efefef;
  color: #212529;
`;
