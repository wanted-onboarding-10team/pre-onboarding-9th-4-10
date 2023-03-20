import { useMemo } from 'react';
import useOrderList from 'hooks/useOrderList';
import MainTable from 'components/MainTable';
import LayoutWrapper from 'components/common/LayoutWrapper';
import useColums from 'hooks/useColums';

const MainPage = () => {
  const { data: orders, isLoading, status, isFetching } = useOrderList();
  const columns = useColums();

  const data = useMemo(() => orders, [orders]);

  if (isLoading || !data || isFetching) {
    return <div>로딩중..</div>;
  }

  return (
    <LayoutWrapper>
      <MainTable
        {...{
          data,
          columns,
        }}
      />
    </LayoutWrapper>
  );
};

export default MainPage;
