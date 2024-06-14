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
  color: #4e53ed;
  font-weight: bold;
  font-family: "Regular";
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
  font-weight: bold;
`
export const RefreshBtn=styled.button`
    display: flex;
  height: 3em;
  width: 13%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  border: 2px solid #4E53ED;
  margin-right: 3em;
  p{
    margin: 0.7rem;
    font-family: "Regular";
    font-weight: bold;
  }
  
`
export const PlaceContainer=styled.div`
    width: 75%;
  height: 28rem;
  margin-top: 1em;
  //background-color: palegoldenrod;
  display: flex;
  justify-content: space-between;

`
export const PlaceWrapper = styled.div`
  width: 23rem; /* 현재 3분의 1로 설정되어 있어서 변경할 필요가 없을 수 있습니다 */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden; /* 이미지가 넘치는 경우를 대비하여 오버플로우를 숨김 */
  cursor: pointer;
`;

export const Place = styled.img`
  width: 100%;
  height: 22rem;
  object-fit: cover; /* 이미지를 가득 채우도록 설정 */
  background-color: #d9d9d9;
  border-radius: 15px;
`;

export const PlaceName1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.4em; /* 원하는 폰트 크기 */
  font-family: "Regular";
  margin-top: 0.8rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;


export const KeywordBtn=styled.button`
 // margin-top: 2em;
    height: 3.5em;
  background-color: black;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 30px;
  width: 11.7rem;
  
`
export const HashTagContaienr=styled.div`
   // background-color: pink;
  width: 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const Notice=styled.div`
  padding-left: 2rem;
    p{
      font-family: "Regular";
      font-size: 16px;
      padding-bottom: 0.3rem;
    }
`
export const HashTag=styled.div`
  font-family: "Regular";
  font-weight: bold;
  font-size: 28px;
  padding-left: 2rem;
  padding-bottom: 0.8rem;
`
export const KeywordContainer=styled.div`
  display: flex;
  width: 78rem;
  margin-top: 5rem;
 //background-color: palegreen;
  height: auto;
`

export const BestContainer=styled.div`
    width: 75%;
  height: 65%;
  //background-color: palegoldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const BestWrapper=styled.div`
  width: 100%;
  margin-top: 2rem;
  background-color: #f4f6f8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const BestTitleWrapper=styled.div`
  width: 97%;
  height: 15%;
  //background-color: palevioletred;
  display: flex;
  align-items: center;
`
export const BestTitle=styled.div`
    font-size: 25px;
  font-weight: bold;
  color: #515151;
`
export const BestCourseContainer=styled.div`
    width: 83%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  flex-direction: column;
  //background-color: gray;
`
export const BestCourses=styled.div`
  width: 100%;
  height: auto;
  //background-color: gray;
  display: flex;
  justify-content: space-between;
`
export const GaugeBarWrapper=styled.div`
  width: 82%;
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
  margin-bottom: 3rem;
`
export const GaugeBar = styled.div`
  width: 82%;
  height: 8px;
  background-color: #d9d9d9;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.completion}%;
    background-color: #4e53ed;
    border-radius: 100px;
    transition: width 0.5s ease;
  }
`;


