import styled  from "@emotion/styled";

export const SubTitleWrapper=styled.div`
  display: flex;
  justify-content: center;
`
export const SubTitle=styled.div`
  width: 50%;
  height: 4vh;
  //background-color: gray;
  font-size: 25px;
  color: #515151;
  font-weight: bolder;
`
export const SearchBarWrapper=styled.div`
 height: 7vh;
 margin-top: 4vh;
 display: flex;
 align-items: center;
 justify-content: center;
`
export const Icon=styled.div`
    width: 3.5%;
  //background-color: #61dafb;
`
export const SearchBarContainer=styled.div`
  width: 37%;
 height: 100%;
 border-radius: 15px;
 background-color: #d9d9d9;
 display: flex;
 align-items: center;
 justify-content: space-between;
`
export const Search=styled.input`
  width: 88%;
  height: 100%;
  border-radius: 15px 0 0 15px;
  border: none;
  background-color: transparent;
  font-size:17px;
  margin-left:10px;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 17px;
  }
`
export const Magnifier=styled.div`
 background-color: #8e8e8e;
 width: 12%;
 height: 100%;
 border-radius: 0 15px 15px 0;
 display: flex;
 justify-content: center;
 align-items: center;
`
export const SubTitle2=styled.div`
    width: 95%;
  font-size: 25px;
  margin-top: 10vh;
  color: #515151;
  font-weight: bold;
`
export const AgentContainer=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4vh;
  flex-direction: column;
 // background-color: green;
`

export const Agents=styled.div`
  width: 55%;
  height: 40vh;
  //background-color: gray;
  display: flex;
  justify-content: space-between;
`
export const GaugeBarWrapper=styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  margin-top: 3vh;
`
export const GaugeBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #d9d9d9;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.completion}%;
    background-color: #5f5f5f;
    border-radius: 100px;
    transition: width 0.5s ease;
  }
`;