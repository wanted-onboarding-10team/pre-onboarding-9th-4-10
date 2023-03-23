import { Button, ButtonGroup } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const FilterButton = () => {
  const [query, setQuery] = useSearchParams();
  const status = query.get('status');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const prevQuery = Array.from(query).reduce((prev: { [index: string]: string }, current) => {
      prev[current[0]] = current[1];
      return prev;
    }, {});

    prevQuery.status = event.currentTarget.value;
    prevQuery.page = '1';
    setQuery(prevQuery);
  };

  return (
    <ButtonGroup spacing='30px'>
      <Button value='true' onClick={handleClick} isDisabled={status === 'true'}>
        완료목록
      </Button>
      <Button value='false' onClick={handleClick} isDisabled={status === 'false'}>
        미완료목록
      </Button>
      <Button onClick={handleClick}>전체</Button>
    </ButtonGroup>
  );
};

export default FilterButton;
