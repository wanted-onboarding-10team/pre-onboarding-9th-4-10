export interface OrderCategory {
  [index: string]: string | number | boolean;
  id: number;
  transaction_time: string;
  status: boolean;
  customer_id: number;
  customer_name: string;
  currency: string;
}

export type OrderProp = {
  key: string;
  displayName: string;
  sortable?: boolean;
  displayType?: (value: unknown) => string;
};
