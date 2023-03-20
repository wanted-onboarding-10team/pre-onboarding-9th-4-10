import { getDataApi } from 'util/api/data';

const mainLoader = async () => {
  const { data: response } = await getDataApi();
  console.log(response);
  //   const data = response;
  return response;
};

export default mainLoader;
