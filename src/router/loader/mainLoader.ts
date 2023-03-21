import { getDataApi } from 'util/api/data';

const mainLoader = async () => {
  const { data: response } = await getDataApi();

  const data = response.map((item: any) => {
    return {
      ...item,
      transaction_date: item.transaction_time.split(' ')[0],
      transaction_time: item.transaction_time.split(' ')[1],
      time: item.transaction_time.split(' ')[1].replace(/:/gi, ''),
    };
  });
  console.log(data);

  return data;
};

export default mainLoader;
