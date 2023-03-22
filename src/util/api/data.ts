import axios from 'axios';
import { useEffect, useState } from 'react';
import { Data } from 'types/types';

export const getDataApi = async () => {
  return await axios.get(`/data/mock_data.json`);
};
