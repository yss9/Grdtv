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

    margin: 0 20px;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
`
export const Wrapper = styled.div`
    margin: 0;
    font-family: Arial, sans-serif;
    height: 97vh;
    overflow-y: hidden;
`
export const ChatWrapper = styled.div`
    display: flex;
    height: calc(100vh - 50px);
`
export const Sidebar = styled.aside`
    width: 13%;
    background-color: #4E53ED;
    border-right: 1px solid #ddd;
    overflow-y: auto;
    color: white;
    font-size: 14px;
`
export const ChatListWrapper = styled.aside`
    width: 20%;
    padding: 10px;
    overflow-y: auto;
`
export const SidebarHeader = styled.div`
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SidebarContentInput = styled.input`
    width: 100%;
    padding: 0 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border: none;
    background-color: #E8E8E8;
    height: 30px;
`
export const ChatList = styled.div`
    list-style: none;
    padding: 0;
`
export const ChatItem = styled.div`
    margin-bottom: 5px;
    width: 100%;
`
export const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: white;
    width: calc(100% - 30px);
`
export const Username = styled.div`
    font-size: 18px;
    margin-left: 20px;
`
export const ChatBubble = styled.div`
    max-width: 40%;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
`