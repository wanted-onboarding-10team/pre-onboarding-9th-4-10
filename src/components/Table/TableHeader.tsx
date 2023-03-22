import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'hooks';
import { QUERY_KEY, SORT_TYPE } from 'constants/index';
import * as S from 'styles/TableStyle';

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
    <S.TableHeader>
      <tr>
        <S.HeaderColumn className='sort' onClick={onClickSortById}>
          {sortType?.includes('id:desc') ? '주문번호▼' : '주문번호▲'}
        </S.HeaderColumn>
        <S.HeaderColumn>고객번호</S.HeaderColumn>
        <S.HeaderColumn>고객명</S.HeaderColumn>
        <S.HeaderColumn>가격</S.HeaderColumn>
        <S.HeaderColumn className='sort' onClick={onClickSortByTime}>
          {sortType?.includes('time:desc') ? '거래일 & 거래시간▼' : '거래일 & 거래시간▲'}
        </S.HeaderColumn>
        <S.HeaderColumn>주문 처리 상태</S.HeaderColumn>
      </tr>
    </S.TableHeader>
  );
};

export default TableHeader;
