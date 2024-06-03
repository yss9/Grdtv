import styled  from "@emotion/styled";

export const RecWrapper=styled.div`
  width: 100%;
  height: 88vh;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const RecContainer=styled.div`
  width: 80%;
  height: 40%;
  //background-color: orchid;
`
export const RecTitle=styled.div`
    height: 31%;
  //background-color: green;
  font-size: 50px;
  font-weight: bold;
  color: #515151;
`
export const RecSubTitle=styled.div`
  height: 20%;
  font-size: 17px;
  //background-color: #61dafb;
  p {
    padding: 5px 0;
  }
`
export const RecBtnWrapper=styled.div`
  height: 50%;
  //background-color: palevioletred;
  display: flex;
  align-items: center;
`
export const RecBtn=styled.button`
  width: 13%;
  height: 30%;
  margin-top: 5%;
  border-radius: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  p{
    position: absolute;
    right: 35%;
  }
  svg{
    margin-left: 0; 
    position: absolute;
    right: 10%; 
  }
`

export const BestWrapper=styled.div`
  width: 100%;
  height: 75vh;
  //background-color: #61dafb;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const BestContainer=styled.div`
    width: 75%;
  height: 65%;
  //background-color: palegoldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const BestTitleWrapper=styled.div`
  width: 97%;
  height: 15%;
  //background-color: palevioletred;
  display: flex;
  align-items: center;
`
export const BestTitle=styled.div`
    font-size: 25px;
  font-weight: bold;
  color: #515151;
`
export const BestCourseContainer=styled.div`
    width: 97%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4vh;
  flex-direction: column;
  //background-color: gray;
`
export const BestCourses=styled.div`
  width: 100%;
  height: 40vh;
  //background-color: gray;
  display: flex;
  justify-content: space-between;
`