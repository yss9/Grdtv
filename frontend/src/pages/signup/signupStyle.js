import styled from "@emotion/styled";
import {motion} from "framer-motion";

export const Wrapper = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ContentsWrapper = styled.div`
    width: 60%;
    height: 100%;
`
export const LogoWrapper = styled.div`
    width: 100%;
    height: 80px;
    padding-left: 10%;
    padding-top: 3%;
    //background-color: #61dafb;
`
export const Logo = styled.img`
    width: auto;
    height: 90%;
    float: left;
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
    width: 20%;
    border-radius: 5px;
    background-color: #7377EA;
    transition: margin-left 0.5s ease;
`
export const FormContainer = styled(motion.div)`
    width: 100%;
    //top: 80px;
    display: flex;
    justify-content: center;
    //overflow-y: auto;
    padding-bottom: 30px;
`
export const BoldText = styled.div`
    margin: 10px 0 10px 0;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
`
export const FormGroup = styled.div`
    margin-bottom: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const InputText = styled.div`
    width: 98%;
    text-align: left;
    margin-bottom: 5px;
    color: #4E53EE;
`
export const Input = styled.input`
    width: 95%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1.5px solid #ccc;
    background-color: white;
    border-radius: 5px;
    height: 30px;
`
export const GenderButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 98%;
`
export const GenderButton = styled.div`
    
    font-size: 16px;
    //background-color: #ccc;
    background-color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        cursor: pointer;
    }
`;

export const GenderImage = styled.img`
    width: 80px;
    height: auto;
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
export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between; /* 버튼을 오른쪽에 정렬 */
    //background-color: beige;
    
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
export const PercentageInput = styled.input`
  width: 50px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
`
export const MBTISwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`
export const MBTISwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;
`
export const SetCenter = styled.div`
    display: flex;
    justify-content: center;
`



export const BoldSubText = styled.div`
    font-size: 13px;
    margin-bottom: 40px;
`
export const RadioButtonWrapper = styled.div`
    height: 30px;
    display: flex;
    justify-items: center;
    align-items: center;
`
export const RadioButton = styled.input`
    width: 15px;
    height: 15px;
    float: left;
    margin-right: 5px;
`
export const RadioButtonComment = styled.div`
    float: left;
    font-size: 15px;
    display: flex;
`
export const RadioButtonSubComment = styled.div`
    font-size: 10px;
    float: left;
    color: lightgray;
    margin-left: 5px;
`

export const UserImg = styled.img`
    margin: 30px 0 10px 0;
    width: 110px;
    height: auto;
    border-radius: 100%;
    border: 2px solid lightgray;
    display: flex;
    justify-content: center;
    background-color: lightgray;
    &:hover {
        cursor: pointer;
    }
`
export const FinishText = styled.div`
    margin: 10px 0 10px 0;
    font-size: 20px;
    font-weight: bold;
`
export const GoToLoginPage = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4E53ED;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
`
export const OverlayImageInput = styled.input`
    display: none;
`