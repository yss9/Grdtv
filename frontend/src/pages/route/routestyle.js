import styled  from "@emotion/styled";

export const RecWrapper=styled.div`
  width: 100%;
    margin-top: 6vh;
  height: 64vh;
  display: flex;
  align-items: center;
  justify-content: center;
    background-image: url("/Img/routePageBackgroundImg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`
export const RecContainer=styled.div`
  width: 80%;
  height: 60%;
  //background-color: orchid;
`
export const RecTitle=styled.div`
    font-family: Title;
  //background-color: green;
  font-size: 37px;
  font-weight: bold;
`
export const RecSubTitle=styled.div`
    margin-top: 15px;
  height: 20%;
  font-size: 15px;
  font-family: Regular;
  p {
    padding: 5px 0;
  }
`
export const RecBtnWrapper=styled.div`
  height: 85%;
  //background-color: palevioletred;
  display: flex;
  align-items: center;
`
export const RecInput = styled.input`
    padding: 1em;
    font-family: Regular;
    width: 220%;
    height: 5px;
    margin-bottom: 1em;
    outline: none;
    border: 2px solid transparent;
    border-radius: 20px;
    background-image: linear-gradient(white, white), linear-gradient(to right, #b7b8e7, #4E53EE, #b7b8e7);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    ::placeholder{
        color: black;
    }
    
`
export const RecList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 120px;
    overflow-y: auto;
    border-radius: 3px;
    width: 235%;
    height: 180px;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
`
export const RecListItem = styled.li`
    padding: 0.7em;
    font-size: 13px;
    font-family: Regular;
    background-color: rgba(0, 0, 0, 0.45);
    color: white;
    cursor: pointer;
    height: 25px;
    &:hover {
        background-color: #f0f0f0;
    }
`;
export const RecListCountry = styled.p`
    font-size: 10px;
    font-family: Regular;
    color: lightgray;
    margin-top: 5px;
`
export const ListModalContent = styled.div`
    padding: 20px; /* 내부 여백 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 옵션: 그림자 추가 */
    border-radius: 8px; /* 옵션: 모서리 둥글게 */
    background-color: #fff; /* 옵션: 배경색 */
    z-index: 10000;
`
export const List = styled.div`
    height: 500px; /* 원하는 최대 높이 설정 */
    width: 300px;
    overflow-y: auto;  /* 세로 스크롤 활성화 */
    overflow-x: hidden; /* 가로 스크롤 비활성화 */
`
export const ListRecListItem = styled.li`
    padding: 0.7em;
    font-size: 13px;
    font-family: Regular;
    cursor: pointer;
    border-radius: 20px;

    &:hover {
        background-color: rgb(78, 83, 238);
        color: white;
    }
`;
export const ListModalCloseButton = styled.div`
    width: 50px;
    height: 50px;
    margin: 0 auto;
`