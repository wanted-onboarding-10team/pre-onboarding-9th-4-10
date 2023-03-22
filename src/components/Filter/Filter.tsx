import { useState } from 'react';
import { useQuery } from 'hooks';
import * as S from 'styles/FilterStyle';

const Filter = () => {
  const [click, setClick] = useState(false);

  const handleQuery = useQuery();

  const handleFilter = (value: string) => {
    handleQuery('filter', value);
    setClick(!click);
  };

  return (
    <S.Filter>
      <S.FilterBtn onClick={() => setClick(!click)}>주문 처리 상태 ▼</S.FilterBtn>
      {click && (
        <S.FilterList>
          <li value=''>
            <S.Item onClick={() => handleFilter('')}>전체</S.Item>
          </li>
          <li value='true'>
            <S.Item onClick={() => handleFilter('true')}>주문 완료</S.Item>
          </li>
          <li value='false'>
            <S.Item onClick={() => handleFilter('false')}>주문 진행 중</S.Item>
          </li>
        </S.FilterList>
      )}
    </S.Filter>
  );
};
export default Filter;
