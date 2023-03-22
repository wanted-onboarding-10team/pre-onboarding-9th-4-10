import styled from 'styled-components';

export const Filter = styled.div`
  position: absolute;
  right: 40px;
  z-index: 1;
`;

export const FilterBtn = styled.button`
  width: 150px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 13px;
  font-size: 13px;
  background: #ffffff;
  appearance: none;
  text-align: center;
  cursor: pointer;
`;

export const FilterList = styled.ul`
  width: 150px;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin-top: 9px;
  text-align: center;
`;

export const Item = styled.button`
  border: none;
  background-color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  padding: 7px 10px;
  margin: 5px 7px;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
      background: #f8e4ff;
      width: 130px;
      border-radius: 8px;
      box-sizing: border-box;
    }
  }
`;
