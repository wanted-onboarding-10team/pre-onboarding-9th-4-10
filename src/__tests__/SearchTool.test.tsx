import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchTool from 'components/table/searchTool/SearchTool';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe('검색기능 테스트', () => {
  it('상태 버튼 클릭시 쿼리 스트링 수정 테스트', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SearchTool />} />
        </Routes>
        ,
      </BrowserRouter>,
    );

    let url;
    const completeButton = screen.getByText('완료목록');
    const inCompleteButton = screen.getByText('미완료목록');
    const allButton = screen.getByText('전체');

    //button이 존재하는지
    expect(completeButton).toBeInTheDocument();
    expect(inCompleteButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();

    // 완료목록 버튼 클릭
    userEvent.click(completeButton);
    url = new URLSearchParams(window.location.search);
    expect(url.get('status')).toBe('true');

    // 미완료 목록 버튼 클릭
    userEvent.click(inCompleteButton);
    url = new URLSearchParams(window.location.search);
    expect(url.get('status')).toBe('false');

    // 전체 버튼 클릭
    userEvent.click(allButton);
    url = new URLSearchParams(window.location.search);
    expect(url.get('status')).toBe('');
  });

  it('검색어 입력시 쿼리 스트링 테스트', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SearchTool />} />
        </Routes>
        ,
      </BrowserRouter>,
    );

    const form = screen.getByTestId('search-form');
    const input = screen.getByLabelText('search-input');

    //input 변경후 submit
    fireEvent.change(input, { target: { value: 'Lee' } });
    fireEvent.submit(form);
    const url = new URLSearchParams(window.location.search);
    expect(url.get('search')).toBe('Lee');
  });
});
