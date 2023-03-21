import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'hooks';
import { QUERY_KEY, SORT_TYPE } from 'constants/index';

const TableHeader = () => {
  const handleQuery = useQuery();

  const [params] = useSearchParams();

  const sortType = params.get(QUERY_KEY.sort);

  const onClickSortById = () => {
    if (!sortType || sortType !== SORT_TYPE.id_desc) {
      handleQuery(QUERY_KEY.sort, SORT_TYPE.id_desc);
    } else {
      handleQuery(QUERY_KEY.sort, SORT_TYPE.id_asc);
    }
  };

  const onClickSortByTime = () => {
    if (!sortType || sortType !== SORT_TYPE.time_desc) {
      handleQuery(QUERY_KEY.sort, SORT_TYPE.time_desc);
    } else {
      handleQuery(QUERY_KEY.sort, SORT_TYPE.time_asc);
    }
  };

  return (
    <TableHeaderBox>
      <tr>
        <HeaderColumn className='sort' onClick={onClickSortById}>
          주문번호
        </HeaderColumn>
        <HeaderColumn>고객번호</HeaderColumn>
        <HeaderColumn>고객명</HeaderColumn>
        <HeaderColumn>가격</HeaderColumn>
        <HeaderColumn className='sort' onClick={onClickSortByTime}>
          거래일 & 거래시간
        </HeaderColumn>
        <HeaderColumn>주문 처리 상태</HeaderColumn>
      </tr>
    </TableHeaderBox>
  );
};

export default TableHeader;

const TableHeaderBox = styled.thead`
  position: sticky;
  top: 0;
  background-color: #efefef;
`;

const HeaderColumn = styled.th`
  padding: 12px;
  font-weight: bold;
  font-size: 20px;

  &.sort {
    cursor: pointer;
  }
`;
