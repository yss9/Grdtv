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
    padding-top: 1%;
    //background-color: #61dafb;
`
export const Logo = styled.img`
    width: auto;
    height: 90%;
    float: left;
    cursor: pointer;
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
    background-color: #fd9800;
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
// export const FormGroup = styled.div`
//     margin-bottom: 15px;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `
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
// export const NextButton = styled.button`
//     padding: 10px 20px;
//     font-size: 16px;
//     background-color: #888;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
// `
export const PageButton = styled.button`
    padding: 1em 2em;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: #4d52eb;
        box-shadow: 0px 15px 20px rgb(60, 66, 178);
        color: #fff;
        transform: translateY(-7px);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

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
export const MBTIButtonWrapper = styled.div`
    width: 25%;
    float: left;
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
    font-size: 13px;
    float: left;
    color: #adadad;
    margin: 20px 0;
`

export const UserImg = styled.img`
    margin: 30px 0 10px 0;
    width: 110px;
    height: 110px;
    overflow: hidden;
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
    color: white;
`
export const OverlayImageInput = styled.input`
    display: none;
`
export const FormGroup = styled.div`
    position: relative;
    padding: 20px 0 0;
    width: 96%;
    margin: 0 2% 50px;
`;
export const FormField = styled.input`
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: #000000;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ label {
        font-size: 17px;
        cursor: text;
        top: 20px;
    }

    &:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #ffa423, #ffeccb);
        border-image-slice: 1;
    }

    &:focus ~ label {
        font-size: 17px;
        color: #3b40b4;
        font-weight: 700;
    }

    &:required,
    &:invalid {
        box-shadow: none;
    }
`;

export const FormLabel = styled.label`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
`;
export const SubComment = styled.div`
    font-size: 15px;
    float: left;
    color: lightgray;
    margin-top: 5px;
`

/* 라디오 버튼 */
export const RadioForm = styled.form`
  display: block;
  margin: auto;
  max-width: 100%;
  position: relative;

  input {
      position: absolute; /* 'fixed' 대신 'absolute' 사용 */
      opacity: 0; /* 라디오 버튼을 완전히 숨기기 위해 opacity를 0으로 설정 */
      top: -9999px; /* 화면 밖으로 라디오 버튼을 이동 */
      left: -9999px;
  }

  label {
    cursor: pointer;
    display: block;
    font-weight: bold;
    text-shadow: 0 0.1em 0.1em rgba(0, 0, 0, 0.2);
    transition: color 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  }

  label:not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  label span {
    box-shadow: 0 0 0 0.2em currentColor inset, 0 0.2em 0.2em rgba(0, 0, 0, 0.2),
      0 0.3em 0.2em rgba(0, 0, 0, 0.2) inset;
    display: inline-block;
    margin-right: 0.5em;
    vertical-align: bottom;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    transition: transform 0.2s cubic-bezier(0.5, 0, 0.5, 2),
      box-shadow 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      color 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  }

  input:checked + label,
  input:checked + label span {
    color: #255ff4;
  }

  input:checked + label,
  input:checked + label span {
    transition-delay: 0.4s;
  }

  label span {
    transform: scale(1.2);
  }

  .worm {
    top: 0.375em;
    left: 0.375em;
    position: absolute;
  }

  .worm__segment {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.75em;
    height: 0.75em;
    border-radius: 50%;
    transition: transform 0.4s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  }

  .worm__segment:before {
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
    background: currentColor;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .worm__segment:first-child:before,
  .worm__segment:last-child:before {
    box-shadow: 0 0 1em 0 currentColor;
  }

  input:nth-of-type(1):checked ~ .worm .worm__segment {
    transform: translateY(0);
  }

  input:nth-of-type(1):checked ~ .worm .worm__segment:before {
    animation-name: hop1;
  }

  input:nth-of-type(2):checked ~ .worm .worm__segment {
    transform: translateY(3em);
  }

  input:nth-of-type(2):checked ~ .worm .worm__segment:before {
    animation-name: hop2;
  }

  input:nth-of-type(3):checked ~ .worm .worm__segment {
    transform: translateY(6em);
  }

  input:nth-of-type(3):checked ~ .worm .worm__segment:before {
    animation-name: hop3;
  }

  @keyframes hop1 {
    from,
    to {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-1.5em);
    }
  }

  @keyframes hop2 {
    from,
    to {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-1.5em);
    }
  }

  @keyframes hop3 {
    from,
    to {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-1.5em);
    }
  }

  @media screen and (prefers-color-scheme: dark) {
    body {
      background: #17181c;
      color: #e3e4e8;
    }

    input:checked + label,
    input:checked + label span,
    .worm__segment:before {
      color: #5583f6;
    }
  }
`;
/* 라디오 버튼 */

export const FileInput = styled.input`
    width: 350px;
    max-width: 100%;
    color: #444;
    padding: 2px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid rgba(8, 8, 8, 0.288);

    ::file-selector-button {
        margin-right: 20px;
        border: none;
        background: #4d52eb;
        padding: 10px 20px;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        transition: background .2s ease-in-out;
    }

    ::file-selector-button:hover {
        background: #fd9800;
    }
`
export const SliderWrapper = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 25px;
    //background-color: gray;
`
// mbti
export const Slider = styled.input`
    -webkit-appearance: none;
    width: 100%;
    max-width: 150px;
    height: 10px;
    border-radius: 5px;
    background-image: linear-gradient(43deg, #9fe0ff, #e5d0d0, #ffccba);
    //outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    //display: inline-block;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-image: linear-gradient(160deg, rgb(207, 207, 243) 0%, #fa9600 100%);
        cursor: pointer;
    }

    ::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        cursor: pointer;
    }
`

export const MBTIButton = styled.div`
    float: left;
    background-color: ${({selected}) => (selected ? '#4e53ee' : 'white')};
    color: ${({selected}) => (selected ? 'white' : '#4e53ee')};
    border: 2px solid #4e53ee;
    display: inline-block;
    width: 70px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
    font-size: 30px;
    font-weight: bold;
    border-radius: 5px;
    user-select: none;
`;
export const PercentValueWrapper = styled.div`
    width: 100%;
    font-size: 20px;
    font-family: "Arial Narrow", sans-serif;
`
export const ErrorMessage = styled.div`
    color: red;
`