import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 300px;
  margin-bottom: 10px;
`;

export const TodayText = styled.div`
  color: gray;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff0000;
`;

export const LoadingImg = styled.img`
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

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

export const FilterSearch = styled.div`
  display: flex;
`;
