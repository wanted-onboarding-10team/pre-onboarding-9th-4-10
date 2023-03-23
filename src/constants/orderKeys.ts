import { OrderProp } from 'types';

export const orderKeys: OrderProp[] = [
  { key: 'id', displayName: '주문번호', sortable: true },
  { key: 'transaction_time', displayName: '거래시간', sortable: true },
  {
    key: 'status',
    displayName: '주문처리상태',
    displayType: value => {
      return value ? '완료' : '미완료';
    },
  },
  { key: 'customer_id', displayName: '고객번호' },
  { key: 'customer_name', displayName: '고객이름' },
  { key: 'currency', displayName: '가격' },
];
