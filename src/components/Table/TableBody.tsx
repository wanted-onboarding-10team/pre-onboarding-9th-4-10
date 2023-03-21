import styled from 'styled-components';
import { OrderData } from 'types';

const TableBody = ({ order }: { order: OrderData }) => {
  return (
    <TableRow>
      <RowColumn>{order.id}</RowColumn>
      <RowColumn>{order.customer_id}</RowColumn>
      <RowColumn>{order.customer_name}</RowColumn>
      <RowColumn>{order.currency}</RowColumn>
      <RowColumn>{order.transaction_time}</RowColumn>
      <RowColumn>{order.status ? '✅ 주문 완료' : '❌ 주문 진행 중'}</RowColumn>
    </TableRow>
  );
};

export default TableBody;

const TableRow = styled.tr`
  margin-bottom: 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  line-height: 2rem;
`;

const RowColumn = styled.td`
  text-align: center;
  padding: 20px 12px;
  padding: 10px;
  height: 10px;
`;

const RowSpacer = styled.tr``;
const Spacer = styled.td`
  height: 10px;
`;
