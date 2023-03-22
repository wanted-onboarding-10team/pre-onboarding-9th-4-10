import { Button, FormControl, Input } from '@chakra-ui/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const OrderSearch = () => {
  const [_, setSearchParams] = useSearchParams();

  const setSearching = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = e.currentTarget.querySelector('input')?.value;
    setSearchParams(searchParams => {
      searchParams.delete('search');
      if (searchValue) {
        searchParams.set('search', searchValue);
      }
      return searchParams;
    });
  };

  return (
    <form onSubmit={setSearching}>
      <FormControl pb={5} pr={5} display={'flex'} gap={2} justifyContent='flex-end'>
        <Input placeholder='고객 이름을 입력해주세요' w='auto' name='searchCustomer' />
        <Button type='submit'>검색</Button>
      </FormControl>
    </form>
  );
};

export default OrderSearch;
