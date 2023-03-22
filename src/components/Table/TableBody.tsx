import { OrderData } from 'types';
import * as S from 'styles/TableStyle';

const TableBody = ({ order }: { order: OrderData }) => {
  return (
    <S.BodyRow>
      <S.RowColumn>{order.id}</S.RowColumn>
      <S.RowColumn>{order.customer_id}</S.RowColumn>
      <S.RowColumn>{order.customer_name}</S.RowColumn>
      <S.RowColumn>{order.currency}</S.RowColumn>
      <S.RowColumn>{order.transaction_time}</S.RowColumn>
      <S.RowColumn>{order.status ? '✅ 주문 완료' : '❌ 주문 진행 중'}</S.RowColumn>
    </S.BodyRow>
  );
};

export default TableBody;
