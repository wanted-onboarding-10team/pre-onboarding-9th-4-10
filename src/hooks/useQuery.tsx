import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderCategory } from 'types';

const useQuery = (url: string) => {
  const [data, setData] = useState<OrderCategory[]>();

  const fetchData = async () => {
    const { data: orderCategory }: { data: OrderCategory[] } = await axios.get(url);
    const specificOrderData = orderCategory.filter(
      data => data.transaction_time.split(' ')[0] === '2023-03-08',
    );
    setData(specificOrderData);
  };

  useEffect(() => {
    fetchData();
    const refetchTimer = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(refetchTimer);
    };
  }, []);

  return { data, fetchData };
};

export default useQuery;
