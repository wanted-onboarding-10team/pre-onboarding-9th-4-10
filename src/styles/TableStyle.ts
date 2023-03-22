import styled from 'styled-components';

export const Table = styled.table`
  width: 800px;
  background-color: #efefef;
  color: #212529;
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: #efefef;
`;

export const HeaderColumn = styled.th`
  padding: 12px;
  font-weight: bold;
  font-size: 20px;

  &.sort {
    cursor: pointer;
  }
`;

export const BodyRow = styled.tr`
  margin-bottom: 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  line-height: 2rem;
`;

export const RowColumn = styled.td`
  text-align: center;
  padding: 20px 12px;
  padding: 10px;
  height: 10px;
`;
