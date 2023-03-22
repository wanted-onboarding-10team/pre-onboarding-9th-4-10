import { useMemo } from 'react';
import useOrderList from 'hooks/useOrderList';
import useColums from 'hooks/useColums';
import LayoutWrapper from 'components/common/LayoutWrapper';
import CustomSkeleton from 'components/common/CustomSkeleton';
import MainTable from 'components/MainTable';

const MainPage = () => {
  const { data: orders, isLoading, dataUpdatedAt } = useOrderList();
  const columns = useColums();
  const data = useMemo(() => orders, [orders]);

  if (isLoading || !data) return <CustomSkeleton />;

  return (
    <LayoutWrapper>
      <MainTable
        {...{
          data,
          columns,
          dataUpdatedAt,
        }}
      />
    </LayoutWrapper>
  );
};

export default MainPage;
