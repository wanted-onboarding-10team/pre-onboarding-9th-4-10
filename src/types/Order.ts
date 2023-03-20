export interface Order {
  id: number; //주문번호
  transaction_time: string; // 거래 시간
  status: boolean; //주문처리상태
  customer_id: number; //고객번호
  customer_name: string; // 고객이름
  currency: string; //가격
}
