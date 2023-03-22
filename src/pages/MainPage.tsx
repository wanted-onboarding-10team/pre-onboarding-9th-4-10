import { Header, Loading, Filter, Pagination, Search, Table } from 'components';
import { useOrderData, usePageData } from 'hooks';
import * as S from 'styles/CommonStyle';

const MainPage = () => {
  const { pages, paginatedData } = usePageData();
  const { isLoading } = useOrderData();

  if (isLoading) {
    <Loading />;
  }

  return (
    <S.Main>
      <Header />
      <S.FilterSearch>
        <Search />
        <Filter />
      </S.FilterSearch>
      <Table paginatedData={paginatedData} />
      <Pagination pages={pages} />
    </S.Main>
  );
};

export default MainPage;
