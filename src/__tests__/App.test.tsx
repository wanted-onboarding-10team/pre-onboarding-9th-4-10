import { cleanup, fireEvent, getAllByRole, render, screen } from '@testing-library/react';
import App from 'App';
import { orderKeys } from 'constants/orderKeys';
import useQuery from 'hooks/useQuery';
import mockData from '../../public/data/mock_data.json';

afterEach(cleanup);

jest.mock('hooks/useQuery');

const selectedDate = '2023-03-08';
const mockDataBySelectedDate = mockData.filter(
  data => data.transaction_time.split(' ')[0] === selectedDate,
);
const mockFetchData = jest.fn();
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

describe('App test', () => {
  test('주문 데이터가 없는 경우, "결과가없습니다"라는 문구가 표시된다.', () => {
    const mockFetchData = jest.fn();
    const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
    mockUseQuery.mockReturnValue({ data: [], fetchData: mockFetchData });
    render(<App />);
    expect(screen.findByText('결과가없습니다')).not.toBeNull();
  });

  describe('주문 데이터가 있는 경우', () => {
    it('주문에 대한 모든 정보가 표 형태로 그려진다', async () => {
      setUpForFullDates();
      const trs = document.querySelectorAll('tbody > tr');
      const orderIds = Array.from(trs).map(tr => {
        const idContext = tr.querySelector('td:first-child')?.textContent ?? '';
        return parseInt(idContext);
      });
      expect(trs.length).toBeGreaterThan(1);
      expect(orderIds[0]).toEqual(mockData[0].id);
    });

    describe('특정 날의 데이터만 보여야 할 경우', () => {
      beforeEach(setUpForDateSelected);

      it('데이터는 오늘의 거래건(2023-03-08)만 보여진다.', async () => {
        const trs = document.querySelectorAll('tbody > tr');
        const transactionIndex = orderKeys.findIndex(
          orderKey => orderKey.key === 'transaction_time',
        );
        const transactionTimes = Array.from(trs).map(tr => {
          const td = tr.querySelectorAll('td').item(transactionIndex);
          return td.textContent?.split(' ')[0];
        });
        expect(transactionTimes.every(time => time === selectedDate)).not.toBeFalsy();
      });

      it('한 페이지에 50건의 주문만 보여진다', async () => {
        const trs = document.querySelectorAll('tbody > tr');
        expect(trs.length).toEqual(50);
      });

      it('페이지네이션이 해당 주문 건수에 맞춰 그려진다.', async () => {
        const maxIndex = Math.ceil(mockDataBySelectedDate.length / 50);
        const pagingContainer = screen.getByLabelText('pagenation-buttons');
        const buttons = getAllByRole(pagingContainer, 'button');
        expect(buttons.length).toEqual(maxIndex);
      });
    });

    describe('정렬', () => {
      beforeEach(setUpForFullDates);

      test('주문번호를 기준으로 데이터가 오름차순으로 정렬(default)', async () => {
        const trs = document.querySelectorAll('tbody > tr');
        const orderIds = Array.from(trs).map(tr => {
          const idContext = tr.querySelector('td:first-child')?.textContent ?? '';
          return parseInt(idContext);
        });
        const isSorted = orderIds.every((v, i, a) => i === 0 || a[i - 1] <= v);
        expect(isSorted).not.toBeFalsy();
      });

      test('"주문번호" 헤더를 눌렀을 때, 주문번호를 기준으로 데이터가 내림차순으로 정렬', async () => {
        const headerBtn = document.querySelectorAll('thead > tr > td')[0];
        expect(headerBtn).not.toBeNull();
        fireEvent.click(headerBtn);
        const trs = document.querySelectorAll('tbody > tr');
        const orderIds = Array.from(trs).map(tr => {
          const idContext = tr.querySelector('td:first-child')?.textContent ?? '';
          return parseInt(idContext);
        });
        const isSorted = orderIds.every((v, i, a) => i === 0 || a[i - 1] >= v);
        expect(isSorted).not.toBeFalsy();
      });

      test('"거래일 & 거래시간" 버튼을 눌렀을 때, "거래일 & 거래시간"을 기준으로 데이터가 내림차순으로 정렬되는가', async () => {
        const headerBtn = document.querySelectorAll('thead > tr > td')[1];
        expect(headerBtn).not.toBeNull();
        if (headerBtn) fireEvent.click(headerBtn);
        const trs = document.querySelectorAll('tbody > tr');
        expect(trs).not.toBeNull();
        expect(trs.length).toBe(50);
        const orderIds = Array.from(trs).map(tr => {
          const idContext = tr.querySelector('td:nth-child(2)')?.textContent ?? '';
          return parseInt(idContext);
        });
        const isSorted = orderIds.every((v, i, a) => i === 0 || a[i - 1] >= v);
        expect(isSorted).not.toBeFalsy();
      });
    });
  });
  describe('필터', () => {
    beforeEach(setUpForFullDates);
    test('"완료목록" 버튼을 누르면 주문처리상태가 "완료"인 것들만 보인다.', async () => {
      const trs = document.querySelectorAll('tbody > tr');
      const orderIds = Array.from(trs).map(tr => {
        const idContext = tr.querySelector('td:first-child')?.textContent ?? '';
        return parseInt(idContext);
      });
      const isSorted = orderIds.every((v, i, a) => i === 0 || a[i - 1] <= v);
      expect(isSorted).not.toBeFalsy();
    });
  });
});

function setUpForFullDates() {
  mockUseQuery.mockReturnValue({
    data: mockData,
    fetchData: mockFetchData,
  });
  render(<App />);
}

function setUpForDateSelected() {
  mockUseQuery.mockReturnValue({
    data: mockDataBySelectedDate,
    fetchData: mockFetchData,
  });
  render(<App />);
}
