import React, { useState } from 'react';
import { useQuery } from 'hooks';
import * as S from 'styles/SearchStyle';

const Search = () => {
  const handleQuery = useQuery();

  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <S.SearchForm>
      <S.SearchInput
        type='text'
        name='search'
        value={text}
        autoComplete='off'
        placeholder='고객이름을 입력해주세요.'
        onChange={handleChange}
      />
      <S.SearchBtn
        type='button'
        onClick={() => {
          handleQuery('search', text);
          setText('');
        }}
      >
        검색
      </S.SearchBtn>
    </S.SearchForm>
  );
};
export default Search;
