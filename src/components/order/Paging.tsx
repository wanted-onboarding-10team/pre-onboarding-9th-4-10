import { Box, Button, Center, HStack } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

interface PagingParams {
  maxIndex: number;
  pagingIndex: number;
}
const pagingOffset = 10;

const Paging = ({ maxIndex, pagingIndex }: PagingParams) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startPageIndex = pagingIndex - ((pagingIndex - 1) % 10) - 1;
  const lastPageIndex =
    maxIndex >= startPageIndex + pagingOffset ? startPageIndex + pagingOffset : maxIndex + 1;

  const handlePageMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e;
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  const handlePagePrevIndexs = () => {
    setSearchParams(searchParams => {
      searchParams.set('page', (pagingIndex <= pagingOffset ? 1 : pagingIndex - 10).toString());
      return searchParams;
    });
  };

  const handlePageNextIndexs = () => {
    setSearchParams(searchParams => {
      searchParams.set(
        'page',
        (maxIndex >= pagingIndex + pagingOffset
          ? pagingIndex + pagingOffset
          : maxIndex + 1
        ).toString(),
      );
      return searchParams;
    });
  };
  return (
    <Center>
      <Box padding={7}>
        <HStack>
          <Button isDisabled={maxIndex < 10} onClick={handlePagePrevIndexs}>
            &lt;
          </Button>
          {Array.from(new Array(maxIndex + 1), (_, key) => key + 1)
            .slice(startPageIndex, lastPageIndex)
            .map(value => (
              <Button key={value} value={value} onClick={handlePageMove}>
                {value}
              </Button>
            ))}
          <Button isDisabled={maxIndex < 10} onClick={handlePageNextIndexs}>
            &gt;
          </Button>
        </HStack>
      </Box>
    </Center>
  );
};

export default Paging;
