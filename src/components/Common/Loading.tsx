import React from 'react';
import loading from 'assets/Loading.gif';
import * as S from 'styles/CommonStyle';

const Loading = () => {
  return (
    <S.Loading>
      <S.LoadingImg src={loading} alt='로딩화면' />
    </S.Loading>
  );
};

export default Loading;
