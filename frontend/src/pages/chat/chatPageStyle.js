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
export const ModalBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const PointModal = styled.div`
    background-color: #fefefe;
    padding: 40px;
    width: 350px;
    height: 400px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
`
export const ProfileImgContainer = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: 2px solid #cecece;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;
export const Button = styled.div`
    width: 200px;
    height: 50px;
    font-size: 20px;
    background-color: #FF9900;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 50px;
`
export const ModalFont = styled.div`
    font-size: 25px;
    color: gray;
    margin: 15px 0 40px;
    padding-bottom: 5px;
`
export const PointButton = styled.div`
    width: 180px;
    height: 50px;
    color: #515151;
    background-color: #FFE3BA;
    border-radius: 10px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.33);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    margin-top: 20px;
`