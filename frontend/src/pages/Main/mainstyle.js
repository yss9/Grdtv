import styled from "@emotion/styled";

export const Wrapper = styled.div`
    overflow: hidden; /* 가로 스크롤바 감춤 */

    ::-webkit-scrollbar {
        display: none; /* Safari 및 Chrome 등의 WebKit 기반 브라우저용 */
    }
`;

export const Map = styled.div`
    margin-top: 120px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg path:hover {
        fill: #4E53ED;
    }
`;

export const Popup = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.82);
    border: 3px solid #33395b;
    border-radius: 30px 0 30px 30px;
    padding: 30px;
    z-index: 1000;
    width: 200px;
    height: 200px;
`;

export const Background = styled.div`
    background-image: url("/backColors.jpg");
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;