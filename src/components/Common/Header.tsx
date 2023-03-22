import { useNavigate } from 'react-router-dom';
import LogoImg from 'assets/Logo.png';
import { TODAY } from 'constants/index';
import * as S from 'styles/CommonStyle';

const Header = () => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.LogoImg src={LogoImg} alt='스위치원 로고' onClick={() => navigate('/')} />
      <S.TodayText>TODAY : {TODAY} </S.TodayText>
    </S.Header>
  );
};
export default Header;
