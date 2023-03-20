import { Global, css } from '@emotion/react';

const style = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css');
  }
  * {
    font-family: 'Pretendard';
  }
`;

const GlobalStyle = () => <Global styles={style} />;

export default GlobalStyle;
