import styled from 'styled-components';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  );
};

export default MainLayout;

const Main = styled.main`
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
