import React from 'react';
import styled from 'styled-components';
import loading from 'assets/Loading.gif';

const Loading = () => {
  return (
    <LoadingWrap>
      <LoadingImg src={loading} />
    </LoadingWrap>
  );
};

export default Loading;

const LoadingWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff0000;
`;

const LoadingImg = styled.img`
  animation: spin 2s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
