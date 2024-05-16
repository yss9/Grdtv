import styled  from "@emotion/styled";

export const Wrapper=styled.div`
 `
export const TopBar=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
 // background-color: yellow;
  width: 100%;
  height: 12vh;
  margin-top: 2.5vh;
`
export const LogoWrapper=styled.div`
  width: 58%;
 // background-color: pink;
  text-align: left;
`
export const Logo=styled.text`
  font-size: 35px;
  font-weight: bolder;
 cursor: pointer;
`
export const MenuContainer= styled.div`
  width: 32%;
  display: flex;
  //background-color: red;
  align-items: center;
  justify-content: space-between;
`
export const Reservation=styled.button`
    background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
 cursor: pointer;
`

export const Recomendation=styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
 cursor: pointer;

`
export const Community=styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
 cursor: pointer;
`
export const MyPage=styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
 cursor: pointer;
`
export const SearchBarWrapper=styled.div`
 height: 8vh;
 //background-color: yellow;
 margin-top: 5vh;
 display: flex;
 align-items: center;
 justify-content: center;
`
export const SearchBarContainer=styled.div`
  width: 40%;
 height: 100%;
 border-radius: 15px;
 background-color: #d9d9d9;
 display: flex;
 align-items: center;
 justify-content: space-between;
 //justify-content: center;
`
export const Pin=styled.div`
 background-color: #515151;
 width: 7%;
 height: 70%;
 margin-left: 15px;
 display: flex;
 justify-content: center;
 align-items: center;
`
export const Magnifier=styled.div`
 background-color: #8e8e8e;
 width: 12%;
 height: 100%;
 border-radius: 0 15px 15px 0;
 display: flex;
 justify-content: center;
 align-items: center;
 //overflow: hidden;
`
export const SubTitleContainer=styled.div`
 display: flex;
 justify-content: center;
`
export const SubTitle1=styled.div`
 width: 80%;
 //background-color: pink;
 margin-top: 70px;
 font-size: 25px;
`
export const BestReviewTitle=styled.text`
  color: #dd3f3f;
 font-weight: bolder;
`
export const BestReiviewer=styled.text`
 color: #8e8e8e;
 font-weight: bolder;
`
export const BestReviewContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

export const BestReviews = styled.div`
 display: flex;
 justify-content: space-between;
 width: 80%;
 margin-top: 20px;
 overflow: hidden;
`;

export const IndicatorContainer = styled.div`
  display: flex;
  justify-content: right;
  //margin-top: 10px;
`;

export const Indicator = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin: 0 2px;
  cursor: pointer;

  &.active {
    background-color: #8e8e8e;
  }
`;
export const SubTitle2=styled.div`
 width: 80%;
 margin-top: 70px;
 font-size: 25px;
 //background-color: coral;
 display: flex;
 align-items: center;
`
export const GoTravelTitle=styled.text`
 font-weight: bolder;
 color: #515151;
`
export const SelectContainer=styled.div`
 margin-left: 60vh;
 display: flex;
 align-items: center;
 
`
export const Select=styled.select`
 width: 170px;
 height: 100%;
background-color: #d9d9d9;
 border: none;
 padding: 15px;
`
export const BlogWrapper=styled.div`
 display: flex;
 justify-content: center;
`
export const BlogContainer=styled.div`
 justify-content: space-between;
 width: 80%;
 height: 100vh;
 //background-color: palegoldenrod;
 margin-top: 50px;
 display: flex;
`
export const Blogs=styled.div`
 width: 70%;
 display: flex;
 flex-direction: column;
`

export const MyMenuWrapper=styled.div`
 width: 27%;
 height: 90vh;
 background-color: #d9d9d9;
 border-radius: 15px;
 
`
export const MyMenuContainer=styled.div`
 display: flex;
 flex-direction: column;
`
export const Profile=styled.div`
 width: 100%;
 height: 12vh;
 //background-color: palevioletred;
 border-radius: 15px 15px 0 0;
 display: flex;
 align-items: center;
 //margin: 10px;
`
export const PImg=styled.img`
 width: 9vh;
 height: 9vh;
 border-radius: 50%;
 background-color: #7d7d7d;
 margin: 20px 0 20px 20px;
`;
export const PContainer=styled.div`
 display: flex;
 flex-direction: column;
 width: 27vh;
 height: 100%;
 margin-left: 10px;
`;
export const Pname=styled.div`
 width: 100%;
 height: 56%;
 //background-color: orchid;
 display: flex;
 align-items: center;
 font-size: 22px;
 color: #515151;
 margin: 7px 0 -5px 0;
`;
export const PIntro=styled.div`
 width: 100%;
 height: 44%;
 display: flex;
 align-items: flex-start;
 font-size: 17px;
 color: #515151;
`;
export const ButtonContainer=styled.div`
 width: 100%;
 height: 9vh;
 background-color: gray;
 display: flex;
 align-items: center;
 justify-content: center;
`
export const VirticalLine = styled.div`
    height: 80%;
    width: 1px;
    margin: 0 1rem;
 background-color: white;
`;
export const MyWrites=styled.div`
 width: 40%;
 display: flex;
 justify-content: center;
 margin-left: 8px;
 cursor: pointer;
 font-size: 22px;
 color: white;
`
export const GoWrite=styled.div`
 width: 40%;
 display: flex;
 justify-content: center;
 margin-right: 8px;
 cursor: pointer;
 font-size: 22px;
 color: white;
`
export const BookMarkContainer=styled.div`
 width: 100%;
 height: 70vh;
 //background-color: green;
 display: flex;
 flex-direction: column;
 align-items: center;
`
export const BookMarkTitle=styled.div`
 width: 80%;
 height: 5vh;
 //background-color: yellow;
 display: flex;
 align-items: center;
 font-size: 20px;
 margin: 10px 0 10px 0;
 color: #8e8e8e;
`
export const BookMarked1=styled.div`
 width: 80%;
 height: 27vh;
 background-color: gray;
 margin: 7px;
`


