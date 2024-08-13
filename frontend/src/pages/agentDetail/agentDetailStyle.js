import styled  from "@emotion/styled";

export const Container=styled.div`
    width: 1500px;
    height: 1900px;
    //background-color: lightcyan;
`;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const AgentProfileBox=styled.div`
    width: 1000px;
    height: 375px;
    background-color: #f4f6f8;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 120px;
`;
export const AgentProfileContainer=styled.div`
    width: 800px;
    height: 230px;
    display: flex;
    justify-content: space-around;
`;
export const ProfileImg=styled.img`
    width: 268px;
    height: 268px;
    margin-top: -70px;
    border-radius: 50%;
`;

export const Content=styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
export const FirstLine=styled.div`
    display: flex;
    align-items: flex-end;
`;
export const ProfileName=styled.div`
    font-size: 40px;
    color: #4e53ee;
    font-weight: bold;
    width: 230px;
    text-align: center;
    font-family: Regular;
`;
export const ProfileCountry=styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #ff9900;
    display: flex;
    align-items: flex-end;
    width: 200px;
    font-family: Regular;
`;
export const Heart=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    margin-left: 120px;
    svg{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
export const HashTags=styled.div`
    margin-top: 30px;
    width: 550px;
    margin-left: 30px;
`;
export const HashTag = styled.span`
    background-color: ${props => props.first ? '#C7C9FF' : '#d9d9d9'}; /* 첫 번째 해시태그의 배경색과 나머지 색상 설정 */
    color: ${props => props.color || '#333'};                       /* 텍스트 색상 */
    border-radius: 30px;   
    padding:3px 6px 3px 6px;
    margin-right: 10px;                                            /* 오른쪽 여백 */
    font-size: 20px;   
    color: #5f5f5f;
    font-family: Regular;
`;
export const Introduce=styled.div`
    margin-top: 30px;
    width: 550px;
    margin-left: 30px;
    font-size: 18px;
    font-family: Regular;
    p{
        margin-bottom: 10px;
    }
`;
export const ChatBtn=styled.button`
    width: 500px;
    height: 60px;
    border-radius: 15px;
    background-color: #4e53ee;
    font-size: 20px;
    color: white;
    font-weight: bold;
    border: none;
    font-family: Regular;
    margin-top: -10px;
`;

export const IntroduceBox=styled.ul`
    width: 850px;
    height: 270px;
    font-family: Regular;
    margin-top: 60px;
    font-size: 20px;
    p{
        text-align: center;
        font-size: 30px;
        color: #4e53ee;
        font-family: SubTitle;
        margin-bottom: 60px;
    }
`
export const In=styled.li`
    list-style: inside;
  margin: 0 0 18px 0 ;
    font-family: Regular;
`
export const Stats=styled.div`
    width: 1500px;
    height: 300px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Regular;
`
export const StatsTitle=styled.div`
    height: 50px;
    text-align: center;
    font-size: 30px;
    color: #4e53ee;
    font-family: SubTitle;
    
`
export const StatsContent=styled.div`
    display: flex;
    margin-top: 50px;
`

export const TotalReservation=styled.div`
    width: 750px;
    height: 250px;
    display: flex;
    align-items:center;
    font-size: 30px;
    font-family: SubTitle;
    flex-direction: column;
`
export const ReservationCount=styled.div`
 color:#4e53ee ;
    display: flex;
    margin-top: 20px;
`
export const StarPoint=styled.div`
    width: 750px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    font-family: SubTitle;
`
export const Point=styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    div{
        margin-left: 5px;
    }
    
`
export const HorizonLine=styled.div`
    width: 1000px;
    height: 1.5px;
    background-color: #d9d9d9;
    
`
export const ReviewContent=styled.div`
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`
export const ReviewBox=styled.div`
    width: 480px;
    height: 250px;
    border: 2px solid #4e53ee ;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const UserProfile=styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: royalblue;
    object-fit: cover;
`
export const ProfileContent=styled.div`
    display: flex;
    align-items: center;
    width: 420px;
    height: 80px;
    //background-color: pink;
    margin-top: 20px;
`
export const ProfileContent2=styled.div`
    display: flex;
    align-items: center;
    width: 420px;
    justify-content: space-between;
    margin-top: 10px;

`
export const UserName=styled.div`
    font-size: 20px;
    margin-left: 10px;
    font-family: SubTitle;
`
export const Review=styled.div`
    width: 420px;
    font-family: Regular;
    margin-top: 20px;
    font-size: 18px;
`
export const Star=styled.div`
    display: flex;
`
export const Date=styled.div`
`

export const SeeAllBtn=styled.button`
    display: flex;
    margin-top: 50px;
    font-size: 15px;
  background-color: transparent;
  justify-content: center;
  align-items: flex-end;
  height: 4rem;
  cursor: pointer;
  border: none;
    margin-left: 920px;
  svg{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
  p{
    font-family: "Regular";

  }
`