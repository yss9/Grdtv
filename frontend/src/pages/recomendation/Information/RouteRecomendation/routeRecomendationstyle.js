import styled  from "@emotion/styled";



export const MapContainer = styled.div`
    position: relative; /* Make sure the position is relative if using transform */
    transform: translateX(-20px); /* Shift the map 30px to the left */
`;

export const BodyContainer=styled.div`
    display: flex;
  flex-direction: column ;
  align-items: center;
`
export const Title=styled.div`
    font-size: 30px;
  font-weight: bold;
  width: 80%;
    display: flex;
    align-items: center;
  text-align: left;
  color: #4e35ed;
  font-family: "Regular";
  margin-top: 3rem;
    p{
        color: #ff9900;
        font-size: 28px;
        margin-left: 15px;
    }
`
export const PlacesContainer=styled.div`
    width: 65rem;
  height: 20rem;
  display: flex;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); /* x-offset, y-offset, blur-radius, color */
  border-radius: 15px;
  margin-bottom: 4rem;
 
 
`
export const LeftWrapper=styled.div`
    display: flex;
  flex-direction: column;
  width: 77%;
  height: 100%;
  align-items: center;
  
`
export const PlacesTitleWrapper=styled.div`
    display: flex;
  align-items: flex-end;
  justify-content: left;
  width: 100%;
  margin-top: 1rem;
    margin-bottom: 15px;
  p{
    font-size: 20px;
    font-family: "Regular";
    margin-left: 1rem;
  }
`
export const PlacesTitle=styled.div`
    margin-top: 10px;
    font-weight: bold;
  font-size: 30px;
  font-family: "Regular";
  margin-left: 2rem;
`
export const PlacesWriter=styled.div`
  font-family: "Regular";
    color:rgba(95, 95, 95, 1);
  font-size: 17px;
  margin-left: 1rem;

`
export const GoBtn=styled.button`
  position: absolute;
  left: 50%;
  font-family: "Regular";
  margin-left: 5rem;
  font-size: 16px;
  border-radius: 30px;
  width: 7rem;
  height: 2.2rem;
  border: none;
  color: white;
  background-color: black;
`
export const PlacesWrapper=styled.div`
    width: 50rem;
  height: 12rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const PlaceWrapper=styled.div`
  display: flex;
  flex-direction: row;
`

export const ContextWrapper=styled.div`
  display: flex;
  flex-direction: column;
`



export const Places=styled.img`
    width: 8.5rem;
  height: 8.5rem;
  margin: 10px;
  background-color: palegoldenrod;
  object-fit: cover; /* 이미지를 가득 채우도록 설정 */
`
export const PlaceName=styled.div`
    font-family: Title;
  text-align: center;
`
export const PlaceName2=styled.div`
    font-family: Title;
    font-size: 30px;
`
export const RightWrapper=styled.div`
    width: 23%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
`
export const Map =styled.div`
  width: 12rem;
  height: 12rem;
  background-color: palevioletred;
`
export const RefreshBtnWrapper=styled.div`
  width: 65rem;
  display: flex;
  justify-content: right;
  margin-bottom: 2rem;
`

export const RefreshBtn=styled.button`
    display: flex;
  height: 3em;
  width: 10rem;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  border: 2px solid #4E53ED;
  p{
    margin: 0.7rem;
    font-family: "Regular";
    font-weight: bold;
  }
  
`