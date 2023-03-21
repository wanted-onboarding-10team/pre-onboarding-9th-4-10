import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'hooks';

const Search = () => {
  const handleQuery = useQuery();

  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <SearchBox>
      <Input
        type='text'
        name='search'
        value={text}
        autoComplete='off'
        placeholder='고객이름을 입력해주세요.'
        onChange={handleChange}
      />
      <Button type='button' onClick={() => handleQuery('search', text)}>
        검색
      </Button>
    </SearchBox>
  );
};
export default Search;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  height: 10px;
  width: 200px;
  border: 1px solid #e0e0e0;
  padding: 15px;
  margin-right: 15px;
`;

const Button = styled.button`
  border: 1px solid #e0e0e0;
  padding: 10px;
  background: #000;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
`;
