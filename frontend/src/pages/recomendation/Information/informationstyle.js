import styled  from "@emotion/styled";

export const Wrapper=styled.div`
    display: flex;
  flex-direction: column;
align-items: center;
`
export const PlaceName=styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 70rem;
  text-align: left;
  font-size: 28px;
  font-family: "Title";
  color: #4e53ed;
  font-weight: bold;
`
export const Container=styled.div`
    width: 70rem;
  height: 22rem;
 // background-color: palevioletred;
`
export const ConsentContainer=styled.div`
    display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`
export const PlaceImg=styled.img`
    width: 25rem;
  height: 22rem;
  background-color: #d9d9d9;
  border-radius: 15px;
  object-fit: cover; /* 이미지를 가득 채우도록 설정 */

`
export const RightWrapper=styled.div`
  width: 43rem;
  height: 22rem;
`
export const DetailInfoWrapper=styled.div`
  margin-right: 2.5rem;
  //background-color: gray;
    color: rgba(81, 81, 81, 1);
  height: 50%;
  display: flex;
  flex-direction: column;
`
export const DetailInfoTitle=styled.text`
    font-size: 18px;
  //background-color: paleturquoise;
  padding: 10px;
  font-weight: bold;
  font-family: "Regular";
    
`
export const DetailInfo=styled.div`
  padding-left: 15px;
    padding-top: 5px;
  font-family: "Regular";
    color: rgba(132, 132, 132, 1);

`
export const ReviewContainer=styled.div`
 // background-color: pink;
`
export const ReviewTitle=styled.div`
    font-family: SubTitle;
    color:rgba(81, 81, 81, 1);
  padding: 10px;
  font-size: 18px;
`
export const BtnContainer=styled.div`
    width: 24rem;
  //background-color: palegreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`
export const BtnTitle=styled.div`
    font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "Regular";
`
export const FindRouteBtn=styled.button`
    width: 18rem;
  border-radius: 15px;
  font-size: 22px;
  padding: 3.5%;
  margin-bottom: 1rem;
  font-weight: bold;
  background-color: white;
  border: 1px solid #4E53EE;
  font-family: "Title";

`
export const RecomendationBtn=styled.button`
    width: 18rem;
  border-radius: 15px;
  font-size: 22px;
    padding: 3.5%;
  background-color: #4E53EE;
  border: none;
  font-family: "SubTitle";
    color:white;

`

export const PlaceReivewContainer=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
//background-color: green;
`

export const PlaceReviews=styled.div`
  //background-color: gray;
    color: rgba(132, 132, 132, 1);
  display: flex;
  justify-content: center;
`

export const GaugeBarWrapper=styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`
export const GaugeBar = styled.div`
  width: 100%;
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
    background-color: #4E53EE;
    border-radius: 100px;
    transition: width 0.5s ease;
  }
`;
