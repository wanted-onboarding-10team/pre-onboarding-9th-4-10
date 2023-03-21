import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'hooks';

const Pagination = ({ pages }: { pages: number }) => {
  const [clickPage, setClickPage] = useState<number>(1);

  const handleQuery = useQuery();

  const firstNum = 1 - (1 % 5) + 1;
  const lastNum = 1 - (1 % 5) + pages;

  const handlePage = (i: number) => {
    handleQuery('page', i.toString());
    setClickPage(i);
  };

  return (
    <PaginationBox>
      <ArrowBack onClick={() => handlePage(clickPage - 1)} disabled={clickPage === firstNum} />
      {Array.from(Array(pages), (_: number, i: number) => {
        return (
          <Button
            key={i + 1}
            className={i + 1 === clickPage ? 'active' : ''}
            onClick={() => handlePage(i + 1)}
          >
            {i + 1}
          </Button>
        );
      })}
      <ArrowNext onClick={() => handlePage(clickPage + 1)} disabled={clickPage === lastNum} />
    </PaginationBox>
  );
};

export default Pagination;

const PaginationBox = styled.div`
  display: flex;
  padding: 20px;
`;

const Button = styled.button`
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

const ArrowBack = styled.button`
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

const ArrowNext = styled.button`
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
