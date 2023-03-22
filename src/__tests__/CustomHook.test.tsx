import { renderHook, waitFor } from '@testing-library/react';
import { useQuery } from 'hooks';
import mockData from '../../public/data/mock_data.json';
import axios from 'axios';

describe('custom hook test', () => {
  it('useQuery Custom Hook mockData Fetch Test', async () => {
    //axios mock함수 설정
    // return값 mockData
    jest.mock('axios');
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: mockData }));

    const { result } = renderHook(() => useQuery('/data/mock_data.json'));

    await waitFor(
      () =>
        expect(result.current.data).toEqual(
          mockData.filter(data => data.transaction_time.split(' ')[0] === '2023-03-08'),
        ),
      { timeout: 5000 },
    );
  });
});
