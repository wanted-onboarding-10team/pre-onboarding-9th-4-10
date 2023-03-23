import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderCategory } from 'types';

const Pagenation = ({ orderList }: { orderList: OrderCategory[] | undefined }) => {
  const [query, setQuery] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>();

  const handlePageQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.value));

    const prevQuery = Array.from(query).reduce((prev: { [index: string]: string }, current) => {
      prev[current[0]] = current[1];
      return prev;
    }, {});

    prevQuery.page = event.currentTarget.value;
    setQuery(prevQuery);
  };

  useEffect(() => {
    const pageNumber = query.get('page');
    setCurrentPage(pageNumber && pageNumber !== '0' ? Number(query.get('page')) : 1);
  }, [query]);

  return (
    <Flex aria-label='pagenation-buttons' marginTop='50px' gap='30px'>
      {orderList &&
        Array.from({ length: Math.ceil(orderList.length / 50) }).map((page, index) => {
          return (
            <Button
              key={`page_${index + 1}`}
              onClick={handlePageQuery}
              value={index + 1}
              border={currentPage === index + 1 ? '2px solid' : ''}
              borderColor='green.400'
            >
              {index + 1}
            </Button>
          );
        })}
    </Flex>
  );
};

export default Pagenation;
