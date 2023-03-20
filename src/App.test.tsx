import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('API 호출', () => {
  test('mock 데이터를 조회', () => {});
  test('주문을 5초마다 최신화', () => {});
});

describe('주문 목록 페이지 조회', () => {
  test('주문에 대한 모든 정보를 표 형태로 확인할 수 있다', () => {});
  test('주문 목록은 페이지네이션이 구현되어야 합니다(한 페이지에 50건의 주문이 보여야 합니다', () => {});
  test('데이터 중에서 오늘의 거래건만 보여지도록 해주세요 (yyyy-MM-dd)', () => {});

  describe('표 정렬', () => {
    test('기본 정렬은 ID 기준 오름차순', () => {});
    describe('표에서 "주문번호", "거래일 & 거래시간" 버튼을 누르면 각각 내림차순 정렬', () => {
      test('표에서 "주문번호" 버튼을 눌렀을 때 내림차순으로 정렬되며 리렌더링 된다.', () => {});
      test('표에서 "거래일 & 거래시간" 버튼을 눌렀을 때 내림차순으로 정렬되며 리렌더링 된다.', () => {});
    });
  });

  describe('filtering 기능', () => {
    test('주문 처리 상태가 "처리(true)"인 것들만 filtering 한다', () => {});
    test('주문 처리 상태가 "비처리(false)"인 것들만 filtering 한다', () => {});
  });
});
