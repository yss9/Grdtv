import styled from "@emotion/styled";

export const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #F4F6F8;
`
export const Wrapper = styled.div`
    margin: 0;
    font-family: Arial, sans-serif;
    overflow-y: hidden;
`
export const ChatPageWrapper = styled.div`
    display: flex;
    height: calc(100vh - 90px);
`
export const PointModal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
`