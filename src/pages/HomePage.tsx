import MainLayout from 'components/layout/MainLayout';
import OrderTable from 'components/table/OrderTable';
import Pagenation from 'components/table/Pagenation';
import { PAGE } from 'constants/page';
import useQuery from 'hooks/useQuery';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const { data } = useQuery('/data/mock_data.json');
  const [query, setQuery] = useSearchParams();

  const pageNumber = Number(query.getAll('page')) || 1;
  const startPageNumber = (pageNumber - 1) * PAGE.maxview;
  const endPageNumber = pageNumber * PAGE.maxview;
  const splitPage = data?.slice(startPageNumber, endPageNumber);

  useEffect(() => {
    if (!query.get('page')) {
      setQuery({ page: '' });
    }
  }, []);

  return (
    <MainLayout>
      <section>
        <OrderTable orderList={splitPage} />
        <Pagenation orderList={data} />
      </section>
    </MainLayout>
  );
};

export default HomePage;
