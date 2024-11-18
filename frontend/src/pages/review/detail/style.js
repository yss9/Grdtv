import styled from "@emotion/styled";


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
  margin-right: 250px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 중앙 정렬 */
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  background-size: contain;
 
`;

export const PImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #7d7d7d;
  object-fit: cover; /* 이미지를 가득 채우도록 설정 */

`;

export const Writer = styled.div`
  padding-left: 10px;
  margin-right: 400px;
  font-family: Regular;
  color: #515151;
`;

export const Date = styled.div`
  margin-right: 650px;
  font-family: Regular;
  color: #515151;
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
  font: inherit;

  &:hover {
    text-decoration: underline;
  }
`;


export const CreatedAt = styled.div``;

export const Body = styled.div`
  width: 100%;
  min-height: 800px;
`;

export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 수직으로 정렬 */
  align-items: flex-start;
  padding-top: 20px;
`;

export const AddressItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const AddressIndex = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

export const Address = styled.div`
  font-family: Regular;
  color: #515151;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const RouteTitle = styled.h2`
  color: #515151;
  font-family: SubTitle;
  text-align: left; /* 왼쪽 정렬 */
  margin-bottom: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  color: #515151;
  margin-top: 50px;
  font-size: 250%;
  font-family: SubTitle;
  text-align: center; 
  margin-left: 300px
`;

export const Contents = styled.div`
  padding-bottom: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #515151;
  font-family: Regular;
  margin-top: 60px;

  img {
    width: 100px;
    height: 100px;
  }
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
  margin-top: 150px;
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
  background-size: cover;
  background-repeat: no-repeat;
`;
