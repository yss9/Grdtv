import styled  from "@emotion/styled";
export const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const TitleWrapper=styled.div`
    width: 80%;
  margin-top: 3em;
  //background-color: yellow;
`
export const Title=styled.div`
  font-size: 28px;
  color: #515151;
`
export const SubTitleWrapper=styled.div`
    width: 78%;
  height: 4em;
  //background-color: yellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SubTitle=styled.div`
    font-size: 17px;
`
export const RefreshBtn=styled.button`
    display: flex;
  height: 3em;
  width: 12%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: #d9d9d9;
  margin-right: 3em;
  p{
    margin: 7px;
  }
  
`
export const PlaceContainer=styled.div`
    width: 75%;
  height: 23em;
  margin-top: 1em;
  //background-color: palegoldenrod;
  display: flex;
  justify-content: space-between;

`
export const PlaceWrapper = styled.div`
  width: 33.3%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Place = styled.div`
  width: 92%;
  height: 21em;
  background-color: #d9d9d9;
  border-radius: 15px;
`;

export const PlaceName = styled.div`
  height: 2em; /* 필요한 경우 높이 고정 */
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.4em; /* 원하는 폰트 크기 */
`;


export const KeywordBtn=styled.button`
  margin-top: 2em;
    height: 3em;
  background-color: #a1a1a1;
  border: none;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
`

