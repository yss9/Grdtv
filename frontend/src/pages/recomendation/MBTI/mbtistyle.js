import styled  from "@emotion/styled";

export const MbtiTitleContainer=styled.div`
  width: 100%;
    height: 105vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: red;
`
export const MbtiTitle=styled.text`
  font-size: 30px;
  font-weight: bold;
  height: 15%;
  display: flex;
  flex-direction: column;
  color: #4E53ED;
 // background-color: pink;
  justify-content: flex-end;
  font-family: "SubTitle";

`

export const MbtiSubTitle=styled.text`
  font-size: 17px;
  color: #515151;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 17%; 
  
  p {
    padding: 5px 0;
    font-family: "Regular";
    color: black;
  }
`
export const WriteMbtiBtnWrapper=styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15%;
  justify-content: center;
`
export const WriteMbtiBtn=styled.button`
  width: 18%;
  height: 62%;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: black;
  border: none;
  cursor: pointer;
  p{
    margin-left: 1.2rem;
    font-size: 0.9rem;
    color: white;
    font-family: "Regular";
  }
  svg{
    position: absolute;
    right: 6%;
  }
`

export const Horizonalline=styled.div`
    height: 1px;
  width: 70%;
  background-color: #9b9b9b;
  margin: 30px;

`
export const MbtiContainer=styled.div`
    margin-top: 20px;
`

export const Mbti=styled.text`
  font-size: 30px;
  color: #515151;
  font-family: "Title";

`
export const Explain=styled.text`
  font-size: 25px;
  color: #515151;
  font-family: "SubTitle";

`
