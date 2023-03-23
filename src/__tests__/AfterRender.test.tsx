import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockData from '../../public/data/mock_data.json';
import axios from '__mocks__/axios';
import HomePage from 'pages/HomePage';
import { BrowserRouter } from 'react-router-dom';

const setup = async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
  await act(async () => {
    render(<HomePage />, { wrapper: BrowserRouter });
  });
};

describe('After Render Test', () => {
  it('화면에 한번에 표시되는 row 개수가 50개인가?', async () => {
    await setup();
    const row = await screen.findAllByTestId('table-rows');
    expect(row.length).toEqual(50);
  });

  it('주문번호 정렬 버튼을 누르면 정렬이 잘 되는가?', async () => {
    await setup();
    fireEvent.click(await screen.findByText(/주문번호/));
    const rowValue = screen.getAllByRole('row');
    const orderNum = Array.from(rowValue)
      .map(row => {
        const cells = row.getElementsByTagName('td');
        const cellValues = Array.from(cells).map(cell => cell.textContent);
        return cellValues;
      })
      .map(e => Number(e[0]))
      .slice(1, rowValue.length + 1);
    const sortedOrderNum = orderNum.slice().sort((a, b) => b - a);
    expect(sortedOrderNum).toEqual(orderNum);
  });
});
