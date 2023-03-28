export interface DefaultDataProps {
  dataKey: string;
  name: string;
  isDisplay: boolean;
  displayFormat?: (value: unknown) => string;
}
