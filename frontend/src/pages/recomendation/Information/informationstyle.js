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
`
export const PlaceImg=styled.image`
    width: 25rem;
  height: 22rem;
  background-color: #d9d9d9;
  border-radius: 15px;
`
export const RightWrapper=styled.div`
  width: 43rem;
  height: 22rem;
`
export const DetailInfoWrapper=styled.div`
  margin-right: 2.5rem;
  //background-color: gray;
  height: 54%;
  display: flex;
  flex-direction: column;
`
export const DetailInfoTitle=styled.text`
    font-size: 18px;
 // background-color: paleturquoise;
  padding: 10px;
`
export const DetailInfo=styled.div`
    //background-color: palegoldenrod;
  padding: 10px;
`
export const ReviewContainer=styled.div`
 // background-color: pink;
`
export const ReviewTitle=styled.div`
  padding: 10px;
  font-size: 18px;
`
export const BtnContainer=styled.div`
    width: 24rem;
  //background-color: palegreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`
export const BtnTitle=styled.div`
    font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
`
export const FindRouteBtn=styled.button`
    width: 23rem;
  border-radius: 15px;
  font-size: 22px;
  padding: 3%;
  margin-bottom: 1rem;
  font-weight: bold;
  background-color: white;
  
`
export const RecomendationBtn=styled.button`
  width: 23rem;
  border-radius: 15px;
  font-size: 22px;
  padding: 3%;
  font-weight: bold;
  background-color: #d9d9d9;
  border: none;
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
    background-color: #5f5f5f;
    border-radius: 100px;
    transition: width 0.5s ease;
  }
`;
