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