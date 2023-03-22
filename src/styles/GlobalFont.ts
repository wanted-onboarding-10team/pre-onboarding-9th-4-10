import { createGlobalStyle } from 'styled-components';
import Bttf from 'assets/fonts/NanumSquareRoundB.ttf';
import Bwoff from 'assets/fonts/NanumSquareRoundB.woff';
import Bwoff2 from 'assets/fonts/NanumSquareRoundB.woff2';
import EBttf from 'assets/fonts/NanumSquareRoundEB.ttf';
import EBwoff from 'assets/fonts/NanumSquareRoundEB.woff';
import EBwoff2 from 'assets/fonts/NanumSquareRoundEB.woff2';
import Lttf from 'assets/fonts/NanumSquareRoundL.ttf';
import Lwoff from 'assets/fonts/NanumSquareRoundL.woff';
import Lwoff2 from 'assets/fonts/NanumSquareRoundL.woff2';
import Rttf from 'assets/fonts/NanumSquareRoundR.ttf';
import Rwoff from 'assets/fonts/NanumSquareRoundR.woff';
import Rwoff2 from 'assets/fonts/NanumSquareRoundR.woff2';

export default createGlobalStyle`
@font-face {
    font-family: "NanumSquareRound";
    font-style: normal;
    font-weight: 300;
    src:
        url(${Lwoff2}) format("woff2"),
        url(${Lwoff}) format("woff"),
        url(${Lttf}) format("truetype");
}

@font-face {
    font-family: "NanumSquareRound";
    font-style: normal;
    font-weight: 400;
    src:
        url(${Rwoff2}) format("woff2"),
        url(${Rwoff}) format("woff"),
        url(${Rttf}) format("truetype");
}

@font-face {
    font-family: "NanumSquareRound";
    font-style: normal;
    font-weight: 700;
    src:
        url(${Bwoff2}) format("woff2"),
        url(${Bwoff}) format("woff"),
        url(${Bttf}) format("truetype");
}

@font-face {
    font-family: "NanumSquareRound";
    font-style: normal;
    font-weight: 800;
    src:
        url(${EBwoff2}) format("woff2"),
        url(${EBwoff}) format("woff"),
        url(${EBttf}) format("truetype");
}
`;
