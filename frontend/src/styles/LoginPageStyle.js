import styled  from "@emotion/styled";

export const Wrapper=styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

export const ConsentWrapper =styled.div`
  width: 450px;
  height: 400px;
  border: 2px solid black;
  color: black;
  margin-top: 130px;
  border-radius: 10px;
  //background-color: lightcoral;

`
export const Title = styled.div`
 margin-left: 135px;
  margin-top: 45px;
  font-size: 60px;
  font-weight: bold;
  background-image: linear-gradient(to right, #b987d2, lightcoral);
  color: transparent;
  background-color: red;
  -webkit-background-clip: text;
  cursor: pointer;
 width: 175px;


`

export const SubTitle = styled.div`
  text-align: center;
  margin-top: 2px;
  font-size: 15px;
`

export const InputWrapper = styled.div`
 //display: flex;
    //position: fixed;
 margin-left: 60px;
 width: 325px;
 height: 78px;
 color: darkgrey;
 border: 1px solid black;
 margin-top: 40px;
`

export const InputIdWrapper = styled.div`
  display: flex;
  //justify-content: center;
 // align-items: center;
  
`

export const InputId = styled.input`
 width: 321px;
    height: 37px;
  border: none;
 border-bottom: 1px solid black;
 background-color: transparent;
 
`

export const InputPwWrapper = styled.div`
  display: flex;
  //justify-content: center;
  //align-items: center;
  
`

export const LoginButton = styled.button`
  position: fixed;
  margin-top: 55px;
  margin-left: 25px;
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
export const InputPw =styled.input`
  height: 37px;
  border: none;
 background-color: transparent;
`
export const FindId = styled.button`
  border: none; 
  background-color: transparent;
  padding: 0; 
  margin: 0;
  margin-left: 610px;
  margin-top: 15px;
  cursor: pointer;
`

export const FindPw = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  margin-left: 15px;
  cursor: pointer;
`

export const SignIn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  margin-left: 15px;
  cursor: pointer;
`
export const Bar= styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  margin-left: 15px;
`

export const Check =styled.div`
     color:red;
   font-size:13px;
 margin-left: -160px;
 margin-top: 9px;
`