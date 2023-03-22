import axios from 'axios';
import { createToday, TodayDays } from 'utils/date';
import { OrderData } from 'types';

export const search = (keyword?: string) => {
  return keyword ? getKeywordApi(keyword) : getTodayDataApi();
};

const getTodayDataApi = async () => {
  const response = await axios.get('/data/mock_data.json');

  const filteredData = response.data.filter((data: OrderData) => {
    const todayDate = new Date(data.transaction_time);
    return TodayDays(createToday(), todayDate);
  });
  return filteredData;
};

const getKeywordApi = async (keyword: string) => {
  const filteredList = await getTodayDataApi();

  if (keyword === 'true' || keyword === 'false') {
    return filteredList.filter((i: OrderData) => {
      if (i.status === Boolean(keyword === 'false' ? '' : keyword)) return i;
    });
  }

  return filteredList.filter((i: OrderData) => {
    if (i.customer_name.toUpperCase().includes(keyword.toLocaleUpperCase())) return i;
  });
};
