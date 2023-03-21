import axios from 'axios';
import { createToday, TodayDays } from 'utils/date';
import { OrderData } from 'types';

const getTodayDataApi = async () => {
  const response = await axios.get('/data/mock_data.json');

  const filteredData = response.data.filter((data: OrderData) => {
    const todayDate = new Date(data.transaction_time);
    return TodayDays(createToday(), todayDate);
  });
  return filteredData;
};

export const search = (keyword?: string) => {
  return keyword ? getKeywordApi(keyword) : getOrderApi();
};

const getOrderApi = async () => {
  const onlyToday = await getTodayDataApi();
  return onlyToday;
};

const getKeywordApi = async (keyword: string) => {
  const filteredList = await getTodayDataApi();
  return filteredList.filter((i: OrderData) => {
    if (i.customer_name.includes(keyword)) return i;
  });
};
