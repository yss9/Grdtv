import styled from "@emotion/styled";

export const ChatInput = styled.input`
    width: 82%;
    height: 100%;
    border: none;
    float: right;
    padding: 0 10px;
`
export const BottomBar = styled.div`
    overflow: hidden;
    position: fixed;
    bottom: 0;
    right: 3%;
    width: 60%;
    height: 8vh;
    border-radius: 10px 10px 0 0;
    box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
`
export const ChatButton = styled.div`
    height: 100%;
    width: 8%;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4E53ED;
    &:hover {
        cursor: pointer;
    }
`
export const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #F4F6F8;
`

export const ChatRoom = styled.div`

    padding: 20px;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
`