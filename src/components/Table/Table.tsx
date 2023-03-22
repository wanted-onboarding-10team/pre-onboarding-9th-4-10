import { TableHeader, TableBody } from 'components';
import { OrderData } from 'types';
import * as S from 'styles/TableStyle';

const Table = ({ paginatedData }: { paginatedData?: OrderData[] }) => {
  return (
    <S.Table>
      <TableHeader />
      <tbody>
        {paginatedData?.map((order: OrderData) => {
          return <TableBody order={order} key={order.id} />;
        })}
      </tbody>
    </S.Table>
  );
};
export default Table;
