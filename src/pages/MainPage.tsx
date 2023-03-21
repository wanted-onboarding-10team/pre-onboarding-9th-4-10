import styled from 'styled-components';
import { Table, Search, Pagination, Header, Loading } from 'components';
import { usePageData, useOrderData } from 'hooks';

const MainPage = () => {
  const { pages, paginatedData } = usePageData();
  const { isLoading } = useOrderData();

  if (isLoading) {
    <Loading />;
  }

  return (
    <MainLayout>
      <Header />
      <Search />
      <Table paginatedData={paginatedData} />
      <Pagination pages={pages} />
    </MainLayout>
  );
};

export default MainPage;

const MainLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;
