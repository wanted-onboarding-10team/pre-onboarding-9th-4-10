import MainLayout from 'components/layout/MainLayout';
import SearchTool from 'components/table/searchTool/SearchTool';
import OrderTable from 'components/table/OrderTable';
import Pagenation from 'components/table/Pagenation';
import { PAGE } from 'constants/page';
import useFilter from 'hooks/useFilter';
import useQuery from 'hooks/useQuery';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
  const { data: responseData } = useQuery('/data/mock_data.json');
  const [query] = useSearchParams();
  const fabricatedData = useFilter(responseData);
  const pageNumber = Number(query.getAll('page')) || 1;
  const startPageNumber = (pageNumber - 1) * PAGE.maxview;
  const endPageNumber = pageNumber * PAGE.maxview;

  return (
    <MainLayout>
      <ToolSection>
        <SearchTool />
      </ToolSection>
      <TableSection>
        <OrderTable orderList={fabricatedData?.slice(startPageNumber, endPageNumber)} />
        <Pagenation orderList={fabricatedData} />
      </TableSection>
    </MainLayout>
  );
};

export default HomePage;

const ToolSection = styled.section`
  width: 100%;
`;

const TableSection = styled.section`
  width: 100%;
  height: 80%;
`;
