import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
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
    <PagenationBox aria-label='pagenation-buttons'>
      {orderList &&
        Array.from({ length: Math.ceil(orderList.length / 50) }).map((page, index) => {
          return (
            <PageButton
              key={`page_${index + 1}`}
              onClick={handlePageQuery}
              value={index + 1}
              style={{
                border: currentPage === index + 1 ? '2px solid black' : '',
              }}
            >
              {index + 1}
            </PageButton>
          );
        })}
    </PagenationBox>
  );
};

export default Pagenation;

const PagenationBox = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PageButton = styled.button`
  width: 30px;
  height: 30px;
  color: black;
  border-radius: 50%;
`;
