import { render, screen } from '@testing-library/react';
import Pagenation from 'components/table/Pagenation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import mockData from '../../public/data/mock_data.json';

test('페이지네이션 테스트', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pagenation orderList={mockData} />} />
      </Routes>
      ,
    </BrowserRouter>,
  );
  const buttons = screen.getByLabelText('pagenation-buttons');
  expect(buttons.childElementCount).toBe(10);
});
