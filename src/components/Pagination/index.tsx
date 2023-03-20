import { HStack, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 이전 페이지로 이동할 수 있는지 여부
  const hasPrevPage = currentPage <= 1;

  // 다음 페이지로 이동할 수 있는지 여부
  const hasNextPage = currentPage >= totalPages;

  // 이전 페이지로 이동하는 이벤트 핸들러
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  // 다음 페이지로 이동하는 이벤트 핸들러
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  // 페이지 버튼 클릭 이벤트 핸들러
  const handlePageClick = (page: number) => () => {
    onPageChange(page);
  };

  return (
    <HStack spacing={2}>
      <Button isDisabled={hasPrevPage} onClick={handlePrevPage}>
        이전
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={i + 1 === currentPage ? 'solid' : 'ghost'}
          onClick={handlePageClick(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button isDisabled={hasNextPage} onClick={handleNextPage}>
        다음
      </Button>
    </HStack>
  );
};

export default Pagination;
