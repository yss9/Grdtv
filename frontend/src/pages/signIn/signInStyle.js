// import styled  from "@emotion/styled";
//
// export const Wrapper=styled.div`
// `
//
// export const ConsentWrapper=styled.div`
//   width: 500px;
//   height: 268px;
//   border: 2px solid darkgrey;
//   color: #A4A4A4;
//   border-radius: 10px;
//   text-align: center;
//   margin-left: 520px;
//   margin-top: 20px;
// `
// export const SubTitle=styled.div`
//   text-align: center;
//   margin-top: 90px;
//   font-size: 30px;
//   font-weight: bold;
//   margin-right: 350px;
// `
//
//
//
// export const IdInput=styled.input`
//   border: none;
//   border-bottom: 2px solid darkgrey;
//   width: 497px;
//   height: 50px;
//   background-color: transparent;
//   font-weight: bold;
//   &:focus{
//     outline:none;
//   }
//   ::placeholder{
//     transform: translateX(10px);
//     font-size: 15px;
//     color: black;
//     font-weight: bold;
//   }
// `
//
// export const IdWrapper=styled.div`
//     display: flex;
//   color: #000;
// `
// export const NameWrapper=styled.div`
//     display: flex;
// `
//
// export const NameInput=styled.input`
//   border: none;
//   border-bottom: 2px solid darkgrey;
//   width: 497px;
//   height: 50px;
//   background-color: transparent;
//   font-weight: bold;
//   &:focus{
//     outline:none;
//   }
//   ::placeholder{
//     transform: translateX(10px);
//     font-size: 15px;
//     color: black;
//     font-weight: bold;
//   }
// `
//
// export const PwWrapper=styled.div`
//     display: flex;
//   color: black;
// `
// export const PwInput=styled.input`
//   border: none;
//   border-bottom: 2px solid darkgrey;
//   width: 497px;
//   height: 50px;
//   background-color: transparent;
//   font-weight: bold;
//   &:focus{
//     outline:none;
//   }
//   ::placeholder{
//     transform: translateX(10px);
//     font-size: 15px;
//     color: black;
//     font-weight: bold;
//   }
// `
//
// export const PwCheckWrapper=styled.div`
//     display: flex;
//   color: black;
// `
// export const PwCheckInput=styled.input`
//   border: none;
//   border-bottom: 2px solid darkgrey;
//   width: 497px;
//   height: 50px;
//   background-color: transparent;
//   font-weight: bold;
//   &:focus{
//     outline:none;
//   }
//   ::placeholder{
//     transform: translateX(10px);
//     font-size: 15px;
//     color: black;
//     font-weight: bold;
//   }
// `
// export const EmailWrapper=styled.div`
//     display: flex;
//   color: black;
// `
// export const EmailInput=styled.input`
//   border: none;
//   width: 100%;
//   height: 50px;
//   background-color: transparent;
//   font-weight: bold;
//   &:focus{
//     outline:none;
//   }
//   ::placeholder{
//     transform: translateX(10px);
//     font-size: 15px;
//     color: black;
//     font-weight: bold;
//   }
// `
// export const NextButton=styled.button`
//     margin-left:575px;
//   margin-top: 40px;
//   width: 400px;
//   height: 50px;
//   background-image: linear-gradient(to right, #b987d2, lightcoral);;
//   border: 2px solid lightpink;
//   border-radius: 10px;
//   color: black;
//   font-size: 20px;
//   letter-spacing: -1px;
//   font-weight: bold;
//   cursor: pointer;
// `
// export const ErrorMsg = styled.div`
//   color: red;
//   margin-top: 15px;
//   font-size: 13px;
//   margin-left: -220px;
// `;

import styled from "@emotion/styled";
import {motion} from "framer-motion";

export const Wrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 97vw;
    height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ContentsWrapper = styled.div`
    width: 60%;
    height: 100%;
`
export const Logo = styled.div`
    text-align: left;
    font-weight: bold;
    font-size: 30px;
    margin-top: 25px;
    margin-left: 8vw;
    width: 100%;
    height: auto;
`
export const ProgressBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 13px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin: 15px 0 25px 0;
`
export const Progress = styled.div`
    height: 100%;
    width: 25%;
    border-radius: 5px;
    background-color: #606060;
    
`
export const FormContainer = styled(motion.div)`
    width: 100%;
    height: calc(100% - 80px);
    top: 80px;
    display: flex;
    justify-content: center;
    //background-color: gray;
    
`
export const BoldText = styled.div`
    margin: 10px 0 25px 0;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
`
export const FormGroup = styled.div`
    margin-bottom: 15px;
    width: 100%;
    //background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const InputText = styled.div`
    width: 98%;
    text-align: left;
    margin-bottom: 5px;
`
export const Input = styled.input`
    width: 95%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 5px;
    height: 25px;
`
export const GenderButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 98%;
`
export const GenderButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ccc;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
`
export const NextButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
export const NextButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #888;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`
export const MBTIContainer = styled.div`
    
    width: 100%;
    display: flex;
    justify-content: flex-start;
    //background-color: lightgray;
    margin-bottom: 100px;
`
export const MBTIWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-right: 50px;
    float: left;

`
// export const MBTISwitch = styled.input`
//   display: flex;
//   align-items: center;
//   font-size: 24px;
//     margin-right: 20px;
//     width: 300px;
//     float: left;
// `
export const InterestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
`
export const InterestButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
export const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽에 정렬 */
`
export const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`
export const MBTISwitchWrapper = styled.div`
  display: flex;
    justify-content: center;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
`
export const Switch = styled(motion.div)`
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  position: relative;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isActive ? 'flex-end' : 'flex-start')};
  padding: 0 5px;
`
export const Handle = styled(motion.div)`
  width: 15px;
  height: 15px;
  background-color: #fff;
  border-radius: 50%;
`