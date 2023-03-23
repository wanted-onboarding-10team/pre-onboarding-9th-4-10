import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const FilterButton = () => {
  const [query, setQuery] = useSearchParams();

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
    <ButtonGroup>
      <Button value='true' onClick={handleClick}>
        완료목록
      </Button>
      <Button value='false' onClick={handleClick}>
        미완료목록
      </Button>
      <Button onClick={handleClick}>전체</Button>
    </ButtonGroup>
  );
};

export default FilterButton;

const ButtonGroup = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  background-color: #e2e2e2;
`;
