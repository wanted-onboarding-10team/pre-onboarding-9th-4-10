import MainLayout from 'components/layout/MainLayout';
import OrderTable from 'components/table/OrderTable';
import useQuery from 'hooks/useQuery';

const HomePage = () => {
  const { data } = useQuery('/data/mock_data.json');

  return (
    <MainLayout>
      <section>
        <OrderTable orderList={data} />
      </section>
    </MainLayout>
  );
};

export default HomePage;
