import styled from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  padding: 20px;
`;

export const PageBtn = styled.button`
  width: 40px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;

  &.active {
    border-radius: 50%;
    background-color: lightblue;
  }
`;

export const BackBtn = styled.button`
  cursor: pointer;
  border: 0;
  background-color: transparent;
  padding: 0;
  position: relative;

  &::after {
    position: absolute;
    right: 20px;
    top: 12px;
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    transform: rotate(225deg);
  }
`;

export const NextBtn = styled.button`
  cursor: pointer;
  border: 0;
  background-color: transparent;
  padding: 0;
  position: relative;

  &::after {
    position: absolute;
    left: 20px;
    top: 12px;
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    transform: rotate(45deg);
  }
`;
