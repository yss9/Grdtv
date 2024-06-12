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
