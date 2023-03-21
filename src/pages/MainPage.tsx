import { useMemo } from 'react';
import useOrderList from 'hooks/useOrderList';
import useColums from 'hooks/useColums';
import LayoutWrapper from 'components/common/LayoutWrapper';
import CustomSkeleton from 'components/common/CustomSkeleton';
import MainTable from 'components/MainTable';

const MainPage = () => {
  const { data: orders, isLoading, status, isFetching } = useOrderList();
  const columns = useColums();
  const data = useMemo(() => orders, [orders]);

  if (isLoading || !data || isFetching) return <CustomSkeleton />;

  return (
    <LayoutWrapper padding={'2vw'}>
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
