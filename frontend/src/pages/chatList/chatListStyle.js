import styled from "@emotion/styled";
export const Container= styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const TitleContainer=styled.div`
    width: 100%;
  height: 10vh;
  background-color: lightgray;
  display: flex;
  align-items: center;
  //justify-content: left;
`
export const Title=styled.text`
  width: 85%;
  font-size: 30px;
  margin-left: 10px;
`
export const ListContainer=styled.div`
//background-color: orchid;
  width: 60%;
  height: 100vh;
`
export const SelectContainer=styled.div`
  //background-color: pink;
  width: 15%;
  height: 40%;
`
export const Select=styled.select`
    width: 90%;
  height: 100%;
  border-radius: 20px;
`
export const ProfileContainer=styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`
export const ProfileWrapper=styled.div`
  width: 80%;
  height: 20vh;
  border: 2px solid black;
  display: flex;
  align-items: center;
  border-radius: 30px;
`
export const ProfileImg=styled.img`
    width: 20%;
  height: 85%;
  padding: 20px;

`
export const ProfileInfoWrapper=styled.div`
    display: flex;
  flex-direction: column;
  //background-color: lightgray;
  width: 70%;
  height: 100%;
`
export const NameWrapper=styled.div`
  width: 100%;
  height: 30%;
  //background-color: yellow;
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  margin: 5px;
`

export const ProfileName=styled.text`
    
`
export const IntroduceWrapper=styled.div`
  width: 100%;
  height: 70%;
  //background-color: ivory;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
`
export const ProfileIntroduce=styled.text`
`

export const ChatBtnWrapper=styled.div`
`
export const ChatBtn=styled.button`
  font-size: 50px;
  margin: 20px;
  border-radius: 30px;
`
export const SearchBarWrapper=styled.div`
  //background-color: blue;
  display: flex;
  justify-content: right;
  padding: 10px;
`
export const SearchContainer = styled.div`
  display: table;
  //background-color: pink;
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 45px;
  min-width: 0;
  padding: 0;
  z-index: 1;
  position: relative;
  line-height: 18px;
  margin: 5px 0;
  font-size: 20px;
  //font-family: 'Mukta Malar';
  transition: all .6s ease;
  cursor: pointer;
  color: black;

  & + div {
    position: relative;
    height: 28px;
    width: 100%;
    margin: -28px 0 0 0;

    svg {
      display: block;
      position: absolute;
      height: 28px;
      width: 170px;
      right: 0;
      top: 0;
      fill: none;
      stroke: black;
      stroke-width: 2px;
      stroke-dashoffset: 212.908 + 59;
      stroke-dasharray: 59 212.908;
      transition: all .6s ease;
    }
  }

  &:not(:placeholder-shown),
  &:focus {
    width: 165px;
    padding: 5px; //돋보기 눌렀을때 검색창 사이즈가 커지고 작아짐.
    cursor: text;

    & + div {
      svg {
        stroke-dasharray: 150 212.908;
        stroke-dashoffset: 300;
      }
    }
  }
`;