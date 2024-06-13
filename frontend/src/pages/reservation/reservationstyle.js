import styled  from "@emotion/styled";

export const SubTitleWrapper=styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`
export const SubTitle=styled.div`
  width: 50%;
  height: 4vh;
  text-align: center;
  //background-color: gray;
  font-size: 22px;
  color: #515151;
  font-family: "Regular";
`
export const SearchBarWrapper=styled.div`
 height: 8vh;
 margin-top: 3vh;
 display: flex;
 align-items: center;
 justify-content: center;
`
export const Icon=styled.div`
  width: 4%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px 0 0 15px;
  border-width: 2px 0 2px 2px; /* top, right, bottom, left */
  border-style: solid;
  border-color: #4e53ed;
  cursor: pointer;
`
export const SearchBarContainer=styled.div`
  width: 40%;
 height: 100%;
 border-radius: 0 15px 15px 0;
  border-width: 2px 2px 2px 0;
  border-style: solid;
  border-color: #4e53ed;
 background-color: white;
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
  margin-left: 10px;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 16px;
    color: black;
  }
`
export const Magnifier=styled.div`
 width: 12%;
 height: 100%;
 border-radius: 0 15px 15px 0;
 display: flex;
 justify-content: center;
 align-items: center;
`
export const SubTitle2=styled.div`
    width: 85%;
  font-size: 22px;
  color: #515151;
  font-family: "Regular";
  font-weight: bold;
  margin-top: 3rem;


`
export const AgentContainer=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  flex-direction: column;
 // background-color: green;
`

export const Agents=styled.div`
  width: 57%;
  height: 32rem;
  //background-color: gray;
  display: flex;
  justify-content: space-between;
`
export const Agents2=styled.div`
  width: 65%;
  height: 20.5rem;
  //background-color: gray;
  display: flex;
  justify-content: space-between;
`
export const GaugeBarWrapper=styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
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
    background-color: #4e53ed;
    border-radius: 100px;
    transition: width 0.5s ease;
  }
`;

export const SelectWrapper=styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`
export const SelectContainer=styled.div`
 //margin-left: 60vh;
 display: flex;
 align-items: center;
  width: 85%;
  //background-color: #61dafb;
  justify-content: space-between;
 
`
export const Select=styled.select`
 width: 20rem;
 height: 80%;
background-color: #d9d9d9;
 border: none;
 padding: 15px;
  font-family: "Regular";
  font-size: 16px;

`
export const SeeAllBtn=styled.button`
    display: flex;
  font-size: 15px;
  background-color: transparent;
  justify-content: center;
  align-items: flex-end;
  height: 4rem;
  cursor: pointer;
  border: none;
  margin-right: 10rem;
  svg{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
  p{
    font-family: "Regular";

  }
`
export const DownWrapper=styled.div`
    background-color: #F4F6F8;
`