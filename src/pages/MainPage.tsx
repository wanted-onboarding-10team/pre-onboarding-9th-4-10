import styled from 'styled-components';
import { Header, Loading, Filter, Pagination, Search, Table } from 'components';
import { useOrderData, usePageData } from 'hooks';

const MainPage = () => {
  const { pages, paginatedData } = usePageData();
  const { isLoading } = useOrderData();

  if (isLoading) {
    <Loading />;
  }

  return (
    <MainLayout>
      <Header />
      <Layout>
        <Search />
        <Filter />
      </Layout>
      <Table paginatedData={paginatedData} />
      <Pagination pages={pages} />
    </MainLayout>
  );
};

export default MainPage;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const Layout = styled.div`
  display: flex;
`;
