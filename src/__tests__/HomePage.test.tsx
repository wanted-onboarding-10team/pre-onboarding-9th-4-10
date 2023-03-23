import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import HomePage from 'pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import mockData from '../../public/data/mock_data.json';

describe('홈페이지 구성 요소 테스트', () => {
  it('초기화면 테스트', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    await act(async () => {
      render(<HomePage />, { wrapper: BrowserRouter });
    });

    //초기 화면데이터 확인
    const table = screen.getByTestId('table-content');
    const buttons = screen.getByTestId('pagenation-buttons');
    const searhForm = screen.getByTestId('search-form');
    const completeButton = screen.getByText('완료목록');
    const inCompleteButton = screen.getByText('미완료목록');
    const allButton = screen.getByText('전체');

    expect(completeButton).toBeInTheDocument();
    expect(inCompleteButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(searhForm).toBeInTheDocument();
    expect(table.childElementCount).toBe(50);
    expect(buttons.childElementCount).toBe(6);
  });
});
