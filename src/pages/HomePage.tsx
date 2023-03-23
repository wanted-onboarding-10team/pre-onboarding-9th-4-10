import { useSearchParams } from 'react-router-dom';
import { Pagenation, OrderTable, MainLayout, SearchTool } from 'components';
import { PAGE } from 'constants/page';
import { useFilter, useQuery } from 'hooks';

const HomePage = () => {
  const { data: responseData } = useQuery('/data/mock_data.json');
  const [query] = useSearchParams();
  const fabricatedData = useFilter(responseData);
  const pageNumber = Number(query.getAll('page')) || 1;
  const startPageNumber = (pageNumber - 1) * PAGE.maxview;
  const endPageNumber = pageNumber * PAGE.maxview;

  return (
    <MainLayout>
      <SearchTool />

      <OrderTable orderList={fabricatedData?.slice(startPageNumber, endPageNumber)} />
      <Pagenation orderList={fabricatedData} />
    </MainLayout>
  );
};

export default HomePage;
