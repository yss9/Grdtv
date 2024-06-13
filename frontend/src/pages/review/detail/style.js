import styled from "@emotion/styled";
/*import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";*/
import avantar from '../../../images/img_1.png';
import travel from '../../../images/남산타워.jpeg'
import Vector from '../../../images/Vector.png'


export const Container = styled.div`
 
    display: flex;
    align-items: center;
    justify-content: center;
 
`;

export const Wrapper = styled.div`
  width: 1200px;
  margin: 100px;
`;

export const CardWrapper = styled.div`
  border: 1px solid black;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
 
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;

`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 중앙 정렬 */

`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 원형으로 만들기 */
  margin-bottom: 10px;
  background-image: url(${avantar});
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Writer = styled.div`
    padding-left:40px;
`;

export const Url = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-right: 30px;
  color: #515151;
  cursor: pointer;
  font: inherit; /* 부모의 폰트를 상속받도록 설정 */
  
  &:hover {
    text-decoration: underline; /* 마우스를 올렸을 때 밑줄 표시 */
  }
`;

export const Favorite = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-right: 30px;
  color: #515151;
  cursor: pointer;
  font: inherit; /* 부모의 폰트를 상속받도록 설정 */
  
  &:hover {
    text-decoration: underline; /* 마우스를 올렸을 때 밑줄 표시 */
  }

`;

export const CreatedAt = styled.div``;

export const Body = styled.div`
  width: 100%;
  min-height: 800px;
 
`;

export const AddressWrapper = styled.div`
  display:flex;
  padding-top:20px

  
 
`;

export const AddressImage = styled.div`
  background-image: url(${Vector});
  background-size: cover;
  background-repeat: no-repeat;
  width: 22px;
  height: 29px;
  
 
`;

export const Address = styled.div`
padding-left:20px
 
  
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

export const Title = styled.h1`
  padding-top: 80px;
  color: #515151;
  text-align: center; 
  
`;

export const Contents = styled.div`
  padding-top: 40px;
  padding-bottom: 120px;
  display: flex;
  flex-direction: column; /* 자식 요소를 수직으로 배치 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
  color: #515151;
  font-family: regular
 
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 80px;
`;

export const Button = styled.button`
  width: 179px;
  height: 45px;
  background-color: white;
  border: 1px solid gray;
  margin: 0px 12px;
  cursor: pointer;

  :hover {
    background-color: gold;
    border-color: white;
  }
`;

export const SubWrapper = styled.div`
  text-align: center;
  margin-top:150px;
 
`;


export const LikeWrapper = styled.div`
  padding-top: 160px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const LocationIcon = styled.img``;

export const LikeCount = styled.div`
  color: #ffd600;
`;

export const DislikeCount = styled.div`
  color: #828282;
`;

export const LinkIcon = styled.img``;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.div`
  width: 996px;
  height: 480px;
  margin-bottom: 30px;
  background-image: url(${travel});
  background-size: cover;
  background-repeat: no-repeat;
`;