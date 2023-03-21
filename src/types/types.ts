export interface Data {
  id: number;
  transaction_date: string;
  transaction_time: string;
  status: boolean;
  customer_id: number;
  customer_name: string;
  currency: string;
}

export interface TableColums {
  id: '주문번호';
  transaction_date: '거래일자';
  transaction_time: '거래시간';
  status: '주문처리상태';
  customer_id: '고객번호';
  customer_name: '고객이름';
  currency: '가격';
}
