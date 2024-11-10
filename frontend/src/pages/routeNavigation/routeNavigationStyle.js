import styled from "@emotion/styled";

export const DestinationInput = styled.input`
    background-color: lightgray;
    width: 65%;
    height: 35px;
    border: none;
    padding: 0 10px;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
`
export const BottomButton = styled.button`
    border: none;
    border-radius: 10px;
    font-family: Regular,sans-serif;
    padding: 3%;
    position: relative;
    top: 66%;
    cursor: pointer;
`