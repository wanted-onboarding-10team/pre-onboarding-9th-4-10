import React, { useState } from 'react';
import { useQuery } from 'hooks';
import { QUERY_KEY } from 'constants/index';
import * as S from 'styles/PageStyle';

const Pagination = ({ pages }: { pages: number }) => {
  const [clickPage, setClickPage] = useState<number>(1);

  const handleQuery = useQuery();

  const firstNum = 1 - (1 % 5) + 1;
  const lastNum = 1 - (1 % 5) + pages;

  const handlePage = (i: number) => {
    handleQuery(QUERY_KEY.page, i.toString());
    setClickPage(i);
  };

  return (
    <S.Pagination>
      <S.BackBtn onClick={() => handlePage(clickPage - 1)} disabled={clickPage === firstNum} />
      {Array.from(Array(pages), (_: number, i: number) => {
        return (
          <S.PageBtn
            key={i + 1}
            className={i + 1 === clickPage ? 'active' : ''}
            onClick={() => handlePage(i + 1)}
          >
            {i + 1}
          </S.PageBtn>
        );
      })}
      <S.NextBtn onClick={() => handlePage(clickPage + 1)} disabled={clickPage === lastNum} />
    </S.Pagination>
  );
};

export default Pagination;
