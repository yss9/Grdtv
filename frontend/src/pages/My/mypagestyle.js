import styled  from "@emotion/styled";

export const MyProfileContainer=styled.div`
    height: 25em;
  //background-color: palegoldenrod;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
export const ProfileImg=styled.image`
  width: 14em;
  height: 14em;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-top: 20px;
`
export const NameWrapper=styled.div`
  width: 17em;
  height: 3.7em;
  background-color: #d9d9d9;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #515151;
`
export const IntroduceWrapper=styled.div`
    display: flex;
  width: 17em;
  margin-top: 10px;
`
export const Mbti=styled.div`
    width: 5em;
  height: 2em;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #515151;

`
export const Introduce=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  color: #515151;

`
export const SettingWrapper=styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
`
export const SettingContainer=styled.div`
    //background-color: #61dafb;
  width: 33%;
  display: flex;
  justify-content: space-between;
`
export const ProfileSettingBtn=styled.button`
    width: 11em;
  height: 2.1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: #d9d9d9;
  svg{
    margin-left: 5px;
  }
  p{
    margin-right: 15px;
  }
`
export const GloplerSettingBtn=styled.button`
  width: 12em;
  height: 2.1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: #d9d9d9;
  svg{
    margin-left: 5px;
  }
  p{
    margin-right: 15px;
  }
`
export const PointSettingBtn=styled.button`
  width: 11em;
  height: 2.1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d9d9d9;
  border: none;
  svg{
    margin-left: 5px;
  }
  p{
    margin-right: 15px;
  }
`
export const MyPageDetailContainer=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: #61dafb;
  margin-top: 2em;
`
export const Container = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  color: #555555;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SelectorContainer = styled.div`
`;

export const SelectorWrapper = styled.div`
  padding: 0.2rem;
  background-color: #efefef;
  width: min-content;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SelectorItem = styled.div`
  white-space: nowrap;
  padding: 0 20rem;
  cursor: pointer;
  z-index: 2;
  user-select: none;
  transition: color 0.2s ease;
  color: transparent;
  font-size: 0.5rem;
  ${({ active }) => active && `
    color: transparent;
  `}
`;

export const Highlight = styled.div`
  background-color: gray;
  border-radius: 8px;
  position: absolute;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 0.7rem;
  transition: left 0.2s ease, width 0.2s ease;
`;
export const Highlight2 = styled.div`
  background-color: transparent;
  border-radius: 8px;
  position: absolute;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 0.7rem;
  transition: left 0.2s ease, width 0.2s ease;
`;
export const SelectorItem2 = styled.div`
  white-space: nowrap;
  //padding: 0 18rem;
  width: 655px;
  cursor: pointer;
  z-index: 2;
  user-select: none;
  transition: color 0.2s ease;
  color: black;
  //background-color: orange;
  font-size: 15px;
  
`;

export const SelectorWrapper2 = styled.div`
  padding: 0.2rem;
  background-color: transparent;
  width: min-content;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;
  color: #333;
`;