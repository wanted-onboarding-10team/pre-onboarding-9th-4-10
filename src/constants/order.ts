import { DefaultDataProps } from 'types/Table';

export const OrderProps: DefaultDataProps[] = [
  {
    dataKey: 'id',
    name: '주문번호',
    isDisplay: true,
  },
  {
    dataKey: 'transaction_time',
    name: '거래시간',
    isDisplay: true,
  },
  {
    dataKey: 'status',
    name: '주문처리상태',
    isDisplay: true,
    displayFormat: value => (value ? '처리' : '미처리'),
  },
  {
    dataKey: 'customer_id',
    name: '고객번호',
    isDisplay: true,
  },
  {
    dataKey: 'customer_name',
    name: '고객이름',
    isDisplay: true,
  },
  {
    dataKey: 'currency',
    name: '가격',
    isDisplay: true,
  },
];
