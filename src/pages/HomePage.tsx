import MainLayout from 'components/layout/MainLayout';
import OrderTable from 'components/table/OrderTable';
import Pagenation from 'components/table/Pagenation';
import { PAGE } from 'constants/page';
import useQuery from 'hooks/useQuery';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderCategory } from 'types';

const HomePage = () => {
  const { data } = useQuery('/data/mock_data.json');
  const [filterdOrderList, setFilterdOrderList] = useState<OrderCategory[]>();
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    if (!query.get('page')) {
      setQuery({ page: '' });
    }
  }, []);

  useEffect(() => {
    const pageNumber = Number(query.getAll('page')) || 1;
    const startPageNumber = (pageNumber - 1) * PAGE.maxview;
    const endPageNumber = pageNumber * PAGE.maxview;
    setFilterdOrderList(data?.slice(startPageNumber, endPageNumber));
  }, [query, data]);

  return (
    <MainLayout>
      <section>
        <OrderTable orderList={filterdOrderList} />
        <Pagenation orderList={data} />
      </section>
    </MainLayout>
  );
};

export default HomePage;
