import styled  from "@emotion/styled";

export const Wrapper=styled.div`
`

export const ConsentWrapper=styled.div`
  width: 500px;
  height: 268px;
  border: 2px solid darkgrey;
  color: #A4A4A4;
  border-radius: 10px;
  text-align: center;
  margin-left: 520px;
  margin-top: 20px;
`
export const SubTitle=styled.div`
  text-align: center;
  margin-top: 90px;
  font-size: 30px;
  font-weight: bold;
  margin-right: 350px;
`



export const IdInput=styled.input`
  border: none;
  border-bottom: 2px solid darkgrey;
  width: 497px;
  height: 50px;
  background-color: transparent;
  font-weight: bold;
  &:focus{
    outline:none;
  }
  ::placeholder{
    transform: translateX(10px);
    font-size: 15px;
    color: black;
    font-weight: bold;
  }
`

export const IdWrapper=styled.div`
    display: flex;
  color: #000;
`
export const NameWrapper=styled.div`
    display: flex;
`

export const NameInput=styled.input`
  border: none;
  border-bottom: 2px solid darkgrey;
  width: 497px;
  height: 50px;
  background-color: transparent;
  font-weight: bold;
  &:focus{
    outline:none;
  }
  ::placeholder{
    transform: translateX(10px);
    font-size: 15px;
    color: black;
    font-weight: bold;
  }
`

export const PwWrapper=styled.div`
    display: flex;
  color: black;
`
export const PwInput=styled.input`
  border: none;
  border-bottom: 2px solid darkgrey;
  width: 497px;
  height: 50px;
  background-color: transparent;
  font-weight: bold;
  &:focus{
    outline:none;
  }
  ::placeholder{
    transform: translateX(10px);
    font-size: 15px;
    color: black;
    font-weight: bold;
  }
`

export const PwCheckWrapper=styled.div`
    display: flex;
  color: black;
`
export const PwCheckInput=styled.input`
  border: none;
  border-bottom: 2px solid darkgrey;
  width: 497px;
  height: 50px;
  background-color: transparent;
  font-weight: bold;
  &:focus{
    outline:none;
  }
  ::placeholder{
    transform: translateX(10px);
    font-size: 15px;
    color: black;
    font-weight: bold;
  }
`
export const EmailWrapper=styled.div`
    display: flex;
  color: black;
`
export const EmailInput=styled.input`
  border: none;
  width: 100%;
  height: 50px;
  background-color: transparent;
  font-weight: bold;
  &:focus{
    outline:none;
  }
  ::placeholder{
    transform: translateX(10px);
    font-size: 15px;
    color: black;
    font-weight: bold;
  }
`
export const NextButton=styled.button`
    margin-left:575px;
  margin-top: 40px;
  width: 400px;
  height: 50px;
  background-image: linear-gradient(to right, #b987d2, lightcoral);;
  border: 2px solid lightpink;
  border-radius: 10px;
  color: black;
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: bold;
  cursor: pointer;
`
export const ErrorMsg = styled.div`
  color: red;
  margin-top: 15px;
  font-size: 13px;
  margin-left: -220px;
`;
