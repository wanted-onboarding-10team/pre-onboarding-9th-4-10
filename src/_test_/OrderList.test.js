import { fireEvent, queryAllByRole, render, screen } from '@testing-library/react';
import OrderList from 'components/order/OrderList';
import { BrowserRouter } from 'react-router-dom';
import { OrderDatas } from '_mocks_/data/OrderDatas';

describe('<OrderList />', () => {
  describe('주문 목록이 없을 경우', () => {
    render(<OrderList orderLists={[]} />, { wrapper: BrowserRouter });
    test('"주문 건이 존재하지 않습니다." 문구가 나타난다.', () => {
      const td = screen.getByText('주문 건이 존재하지 않습니다.');
      expect(td).not.toBeNull();
    });
  });

  describe('주문 목록이 있을 경우', () => {
    test('"주문 건이 존재하지 않습니다." 문구가 나타나지 않고 내용이 한 줄 이상 그려진다', async () => {
      render(<OrderList orderLists={OrderDatas} />, { wrapper: BrowserRouter });
      await expect(screen.queryByText('주문 건이 존재하지 않습니다.')).not.toBeInTheDocument();
      const container = document.querySelector('table');
      await expect(queryAllByRole(container, 'row').length).toBeGreaterThan(2);
    });
  });

  describe('정렬', () => {
    const mockSearchParams = jest.fn();
    beforeEach(() => {
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useSearchParams: () => mockSearchParams,
      }));
      render(<OrderList orderLists={OrderDatas} />, { wrapper: BrowserRouter });
    });

    test('주문번호를 기준으로 데이터가 오름차순으로 정렬(default)', async () => {
      const table = screen.findByRole('table');
      const orderNos = Array.from((await table).querySelectorAll('tbody > tr')).map(tr => {
        return parseInt(tr.querySelector('td:first-child').textContent);
      });
      const isSorted = orderNos.every((v, i, a) => i === 0 || parseInt(a[i - 1]) <= v);
      expect(isSorted).not.toBeFalsy();
    });

    test('"주문번호" 버튼을 눌렀을 때, 주문번호를 기준으로 데이터가 내림차순으로 정렬', async () => {
      const container = document.querySelector('table');
      fireEvent.click(document.querySelector('button[name="id"]'));
      const table = screen.findByRole('table');
      const orderNos = Array.from((await table).querySelectorAll('tbody > tr')).map(tr => {
        return parseInt(tr.querySelector('td:first-child').textContent);
      });
      const isSorted = orderNos.every((v, i, a) => i === 0 || parseInt(a[i - 1]) >= v);
      expect(isSorted).not.toBeFalsy();
    });

    test('"거래일 & 거래시간" 버튼을 눌렀을 때, "거래일 & 거래시간"을 기준으로 데이터가 내림차순으로 정렬되는가', async () => {
      fireEvent.click(document.querySelector('button[name="transaction_time"]'));
      const table = screen.findByRole('table');
      const transactionTimes = Array.from((await table).querySelectorAll('tbody > tr')).map(tr => {
        return tr.querySelector('td:nth-child(2)').textContent;
      });
      const isSorted = transactionTimes.every((v, i, a) => i === 0 || a[i - 1] >= v);
      expect(isSorted).not.toBeFalsy();
    });
  });

  describe('필터', () => {
    const mockSearchParams = jest.fn();
    beforeEach(() => {
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useSearchParams: () => mockSearchParams,
      }));
      render(<OrderList orderLists={OrderDatas} />, { wrapper: BrowserRouter });
    });

    test('처리 버튼을 누르면 주문처리 상태가 처리인 건들만 표로 나타난다', async () => {
      fireEvent.click(
        await screen.findByText(
          (content, element) => element.tagName.toLowerCase() === 'button' && content === '처리',
        ),
      );
      const table = screen.findByRole('table');
      const orderStatuses = Array.from((await table).querySelectorAll('tbody > tr')).map(tr => {
        return tr.querySelector('td:nth-child(3)').textContent;
      });
      const isFiltered = orderStatuses.every(v => v === '처리');
      expect(isFiltered).not.toBeFalsy();
    });

    test('비처리 버튼을 누르면 주문처리 상태가 처리인 건들만 표로 나타난다', async () => {
      fireEvent.click(
        await screen.findByText(
          (content, element) => element.tagName.toLowerCase() === 'button' && content === '비처리',
        ),
      );
      const table = screen.findByRole('table');
      const orderStatuses = Array.from((await table).querySelectorAll('tbody > tr')).map(tr => {
        return tr.querySelector('td:nth-child(3)').textContent;
      });
      const isFiltered = orderStatuses.every(v => v === '비처리');
      expect(isFiltered).not.toBeFalsy();
    });
  });

  describe('검색', () => {
    describe('검색할 고객 이름을 입력한 후 검색할 때', () => {
      const mockSearchParams = jest.fn();
      beforeEach(() => {
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useSearchParams: () => mockSearchParams,
        }));
        render(<OrderList orderLists={OrderDatas} />, { wrapper: BrowserRouter });
      });

      test('해당 고객의 주문 목록이 있다면 조회된다.', async () => {
        const testCustomer = 'Rama Sheppard';
        fireEvent.change(document.querySelector('input[name="searchCustomer"]'), {
          target: { value: testCustomer },
        });
        fireEvent.click(
          await screen.findByText(
            (content, element) => element.tagName.toLowerCase() === 'button' && content === '검색',
          ),
        );
        const table = screen.findByRole('table');
        const ordersByCustomer = Array.from((await table).querySelectorAll('tbody > tr')).map(
          tr => {
            return tr.querySelector('td:nth-child(5)').textContent;
          },
        );
        const isFiltered = ordersByCustomer.every(v => v === testCustomer);
        expect(isFiltered).not.toBeFalsy();
      });

      test('해당 고객의 주문 목록이 없다면 "주문 건이 존재하지 않습니다." 문구가 나타난다.', async () => {
        const testCustomer = 'Tester';
        fireEvent.change(document.querySelector('input[name="searchCustomer"]'), {
          target: { value: testCustomer },
        });
        fireEvent.click(
          await screen.findByText(
            (content, element) => element.tagName.toLowerCase() === 'button' && content === '검색',
          ),
        );
        expect(screen.findByRole('주문 건이 존재하지 않습니다.')).not.toBeNull();
      });
    });
    describe('고객의 이름을 성이나 이름만 작성하여 검색할 경우', () => {
      const mockSearchParams = jest.fn();
      beforeEach(() => {
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useSearchParams: () => mockSearchParams,
        }));
        render(<OrderList orderLists={OrderDatas} />, { wrapper: BrowserRouter });
      });
      test('해당되는 고객의 주문 목록이 있다면 조회된다.', async () => {
        const testCustomer = 'Sheppard';
        fireEvent.change(document.querySelector('input[name="searchCustomer"]'), {
          target: { value: testCustomer },
        });
        fireEvent.click(
          await screen.findByText(
            (content, element) => element.tagName.toLowerCase() === 'button' && content === '검색',
          ),
        );
        const table = screen.findByRole('table');
        const ordersByCustomer = Array.from((await table).querySelectorAll('tbody > tr')).map(
          tr => {
            return tr.querySelector('td:nth-child(5)').textContent;
          },
        );
        const isFiltered = ordersByCustomer.every(v =>
          v.toLowerCase().includes(testCustomer.toLowerCase()),
        );
        expect(isFiltered).not.toBeFalsy();
      });
      test('해당 고객의 주문 목록이 없다면 "주문 건이 존재하지 않습니다." 문구가 나타난다.', async () => {
        const testCustomer = 'Tester';
        fireEvent.change(document.querySelector('input[name="searchCustomer"]'), {
          target: { value: testCustomer },
        });
        fireEvent.click(
          await screen.findByText(
            (content, element) => element.tagName.toLowerCase() === 'button' && content === '검색',
          ),
        );
        expect(screen.findByRole('주문 건이 존재하지 않습니다.')).not.toBeNull();
      });
    });
  });
});
