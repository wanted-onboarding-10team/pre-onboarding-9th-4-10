import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderCategory } from 'types';

const useQuery = (url: string) => {
  const [data, setData] = useState<OrderCategory[]>();

  const fetchData = async () => {
    const { data: orderCategory }: { data: OrderCategory[] } = await axios.get(url);
    setData(orderCategory);
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
