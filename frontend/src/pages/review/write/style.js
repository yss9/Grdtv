import styled from "@emotion/styled";
import mapImage from '../../../images/Map.png';
import cameraImage from '../../../images/Frame 26.png';
import iconImage from '../../../images/Polygon 6.png';
import plusImage from '../../../images/Frame 53.png';



export const Container = styled.div`
 
    display: flex;
    align-items: center;
    justify-content: center;
 
`;

export const Wrapper = styled.div`
  width: 1000px;
  border: 1px solid black;
  margin: 100px;
  padding-top: 50px;
  padding-bottom: 80px;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
 
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

export const HiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #F4F6F8;
  border-radius: 8px;
  width: 800px; 
  margin-top:50px
  
`;

export const HiTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #BDBDBD; /* 제목과 불러오기 버튼 사이에 선 추가 */
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

export const HiTitle = styled.h2`
  color: #BDBDBD;
  margin: 0;
`;

export const HiButton = styled.button`
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 500;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const PhotoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  
`;

export const PhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 추가: 내부 요소들을 가운데 정렬 */
  width: 120px;
  height: 120px;
  background-color: #E0E0E0;
  border-radius: 8px;
  margin: 0 10px;
  
`;

export const HiIcon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${cameraImage});
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 15px;
 
`;

export const HelloIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${iconImage});
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 15px;
`;

export const PlusIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${plusImage});
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 15px;
`;

export const HiLabel = styled.p`
  color: #BDBDBD;
  margin-top:10px
`;

export const Map = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${mapImage}); /* 동적으로 가져온 이미지 사용 */
  background-size: cover;
  border-radius: 8px;
  margin-left: 20px;
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
  width: 700px;
  height: 52px;
  margin-top: 16px;
  border: 1px solid #bdbdbd;
  
  
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 세로 중앙 정렬을 위한 높이 설정 */
  padding-right:280px;
 
`;


export const Youtube = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const ImageWrapper = styled.div`
  width: 996px;
  padding-top: 100px;
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
  padding-left: 750px;
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
  background-color: black;
  color: white; /* 글자 색을 하얀색으로 설정 */
  border-radius: 30px;
  border: 1px solid black;
`;


export const Error = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: red;
`;

