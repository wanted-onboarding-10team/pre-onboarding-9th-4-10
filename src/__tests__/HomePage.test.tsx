import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import HomePage from 'pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import mockData from '../../public/data/mock_data.json';

describe('홈페이지 구성 요소 테스트', () => {
  beforeEach(async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    await act(async () => {
      render(<HomePage />, { wrapper: BrowserRouter });
    });
  });

  it('초기화면 테스트', () => {
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

  it('상태별 필터링 테스트', async () => {
    let url;
    const table = screen.getByTestId('table-content');
    const completeButton = screen.getByText('완료목록');
    const inCompleteButton = screen.getByText('미완료목록');

    // 처리목록만
    act(() => {
      userEvent.click(completeButton);
    });
    // 쿼리 파라미터 테스트
    url = new URLSearchParams(window.location.search);
    expect(url.get('status')).toBe('true');
    // 처리 목록만 보여지는지 테스트
    table.childNodes.forEach(tr => expect(tr.childNodes.item(2).textContent).toBe('완료'));

    // 비처리 목록만
    act(() => {
      userEvent.click(inCompleteButton);
    });

    // 쿼리 파라미터 테스트
    url = new URLSearchParams(window.location.search);
    expect(url.get('status')).toBe('false');

    // 비처리 목록만 보여지는지 테스트
    table.childNodes.forEach(tr => expect(tr.childNodes.item(2).textContent).toBe('미완료'));
  });

  it('유저 이름 검색 테스트', async () => {
    const form = screen.getByTestId('search-form');
    const input = screen.getByTestId('search-input');
    const allButton = screen.getByText('전체');

    act(() => {
      userEvent.click(allButton);
      fireEvent.change(input, { target: { value: 'lee' } });
      fireEvent.submit(form);
    });

    const url = new URLSearchParams(window.location.search);
    expect(url.get('search')).toBe('lee');
    const table = screen.getByTestId('table-content');

    table.childNodes.forEach(tr => expect(tr.childNodes.item(4).textContent).toContain('lee'));

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.submit(form);
    });
  });

  it('주문번호,거래시간 순 정렬 테스트', () => {
    const orderSort = screen.getByText(/주문번호/);
    const transactionSort = screen.getByText(/거래시간/);

    // 주문번호 내림차순
    act(() => {
      userEvent.click(orderSort);
    });

    const table = screen.getByTestId('table-content');
    const orderList: number[] = [];
    table.childNodes.forEach(tr => orderList.push(Number(tr.childNodes.item(0).textContent)));

    // 내림차순인지 테스트
    if (orderList.length > 1) {
      expect(orderList.every((v, i, a) => i === a.length - 1 || v >= a[i + 1])).toBeTruthy();
    }

    // 거래시간 내림차순
    act(() => {
      userEvent.click(transactionSort);
    });

    const transactionList: string[] = [];
    table.childNodes.forEach(tr =>
      transactionList.push(tr.childNodes.item(1).textContent as string),
    );

    //내림차순 테스트
    if (transactionList.length > 1) {
      expect(
        transactionList.every((v, i, a) => i === a.length - 1 || new Date(v) >= new Date(a[i + 1])),
      ).toBeTruthy();
    }
  });
});
