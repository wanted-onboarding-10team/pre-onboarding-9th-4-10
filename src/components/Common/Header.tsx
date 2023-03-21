import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from 'assets/Logo.png';
import { TODAY } from 'constants/index';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <Logo src={LogoImg} alt='스위치원 로고' onClick={() => navigate('/')} />
      <SubTitle>TODAY : {TODAY} </SubTitle>
    </HeaderBox>
  );
};
export default Header;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 300px;
  margin-bottom: 10px;
`;

const SubTitle = styled.div`
  color: gray;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;
