import styled from "@emotion/styled";



export const Wrapper = styled.div`
  width: 1200px;
  /* height: 1847px; */
  border: 1px solid black;
  margin: 100px;
  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const Title = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #4E53EE;
`;

export const Label = styled.div`
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`;

export const InputWrapper = styled.div`
  padding-top: 40px;
`;

export const PhotoWrapper = styled.div`
  padding-top: 40px;
  background-color: #F4F6F8;
  width: 548px; /* 양쪽에 1px의 border가 있으므로 2px를 줄입니다. */
  height: 248px; /* 테두리의 두께를 고려하여 높이를 조정합니다. */
  border-radius: 8px; /* 모서리를 둥글게 설정합니다. */
`;

export const Subject = styled.input`
  width: 994px; /* 양쪽에 1px의 border가 있으므로 2px를 줄입니다. */
  height: 50px; /* 테두리의 두께를 고려하여 높이를 조정합니다. */
  padding-left: 16px;
  border: none; /* 테두리 제거 */
  outline: none; /* 포커스 효과 제거 */
  border-bottom: 1px solid #bdbdbd; /* 하단 테두리만 유지합니다. */
  font-size:25px;
`;


export const Contents = styled.textarea`
  width: 994px; /* 양쪽에 1px의 border가 있으므로 2px를 줄입니다. */
  height: 300px; /* 테두리의 두께를 고려하여 높이를 조정합니다. */
  padding-left: 16px;
  padding-top: 14px; /* 상단 padding 추가 */
  border: none; /* 테두리 제거 */
  outline: none; /* 포커스 효과 제거 */
  border-bottom: 1px solid #bdbdbd; /* 하단 테두리만 유지합니다. */
  font-size:18px;
`;


export const ZipcodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Zipcode = styled.input`
  width: 77px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const SearchButton = styled.button`
  width: 124px;
  height: 52px;
  margin-left: 16px;
  background-color: black;
  cursor: pointer;
  color: white;
`;

export const Address = styled.input`
  width: 996px;
  height: 52px;
  margin-top: 16px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const Youtube = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const ImageWrapper = styled.div`
  width: 996px;
  padding-top: 40px;
`;

export const ImageBox = styled.div`
  display: flex;
`;

export const UploadButton = styled.button`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const OptionWrapper = styled.div`
  width: 996px;
  padding-top: 40px;
`;

export const RadioButton = styled.input`
  cursor: pointer;
`;

export const RadioLabel = styled.label`
  margin-left: 8px;
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end; /* 자식 요소를 오른쪽으로 정렬 */
  padding-top: 80px;
  padding-left: 800px;
`;

export const CancelButton = styled.button`
 export const ButtonWrapper = styled.div\`
  display: flex;
  justify-content: flex-end; /* 자식 요소를 오른쪽으로 정렬 */
  width: 100%; /* 부모 요소의 너비 설정 */

  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 80px;
  height: 50px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
  background-color: white; 
  border-radius: 30px; 
  border: 1px solid black
 
`;

export const SaveButton = styled.button`
  width: 80px;
  height: 50px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
  background-color: white; 
  border-radius: 30px; 
  border: 1px solid black
 
`;

export const Error = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: red;
`;

export const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;

export const Desc = styled.div`
  //설명 부분의 CSS를 구현
  text-align: center;
  margin: 20px;
`;

