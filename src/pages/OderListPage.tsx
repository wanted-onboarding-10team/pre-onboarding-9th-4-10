import { useLoaderData } from 'react-router-dom';
import { Data } from 'types/types';

const OrderListPage = () => {
  const data = useLoaderData() as Data;
  //   console.log(data);
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default OrderListPage;
