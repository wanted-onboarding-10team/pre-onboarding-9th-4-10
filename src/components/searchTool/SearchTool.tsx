import styled from 'styled-components';
import { FilterButton, SearchBar } from 'components';

const SearchTool = () => {
  return (
    <ToolContainer>
      <SearchBar />
      <FilterButton />
    </ToolContainer>
  );
};

export default SearchTool;
const ToolContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
