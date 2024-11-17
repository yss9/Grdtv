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
    cursor: pointer;
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
    cursor: pointer;
`
export const ReviewContentsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const ReviewSentence = styled.div`
    font-size: 20px;
    color: gray;
    margin: 20px 0;
    line-height: 1.5;
`
export const ReviewInputWrapper = styled.div`
    width: 250px;
    height: 100px;
    border: none;
    border-bottom: 1px solid gray;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        width: 100%; /* 가로선 길이 */
        height: 1px; /* 가로선 두께 */
        background-color: gray; /* 가로선 색상 */
        top: 50%; /* 세로 중앙 */
        transform: translateY(-50%);
    }
`;
export const ReviewInput = styled.textarea`
    width: 100%;
    font-size: 15px;
    height: calc(100% - 15px);
    line-height: 3.4;
    border: none;
    resize: none; /* 크기 조정 방지 */
    outline: none; /* 클릭 시 나타나는 테두리 제거 */
    overflow: hidden; /* 기본 스크롤 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
    -ms-overflow-style: none; /* IE에서 스크롤바 숨기기 */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
    }
`;
export const SideBarHeaderWrapper = styled.div`
    width: 100%;
    height: 40px;
    padding: 20px 0;
    transition: 0.3s;
    background-color: ${({ isActive }) => (isActive ? 'rgba(255, 255, 255, 0.7)' : 'transparent')};
    color: ${({ isActive }) => (isActive ? 'black' : 'white')};
`;
