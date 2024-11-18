import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    max-height: 84vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px; /* Width of the scrollbar */
    }

    &::-webkit-scrollbar-thumb {
        background-color: gray; /* Color of the scrollbar thumb (the draggable part) */
        border-radius: 10px; /* Round the scrollbar edges */
    }

    &::-webkit-scrollbar-track {
        background-color: #f0f0f0; /* Background color of the scrollbar track */
    }

`
export const Wrapper = styled.div`
    height: 1900px;
    display: flex;
    align-items: center;
    flex-direction: column;
`
export const SubtitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 120px;
    margin-top: 80px;
    
`
export const SubtitleContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
    height: 120px;
    margin-top: 80px;
`
export const Subtitle = styled.div`
    color: #4e53ed;
    font-family: SubTitle;
    font-size: 30px;
`
export const Subtitle2 = styled.div`
    font-size: 17px;
    text-align: center;
    margin-top: 15px;
    line-height: 1.6;
    font-family: Regular;
    
    a{
        font-size: 14px;
        margin-top: 20px;
    }
    
    p{
        margin-left: 20px;
    }
`
export const RecomContainer=styled.div`
    width: 900px;
    margin-top: 20px;
    height: 350px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const RecentContainer=styled.div`
    width: 900px;
    margin-bottom: 20px;
    height: 140px;
    background-color: #f4f6f8;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Top=styled.div`
    width: 93%;
    height: 60px;
    //background-color: beige;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`
export const Left=styled.div`
    display: flex;    
    align-items: center;
`
export const Left3=styled.div`
    width: 35%;
    display: flex;    
    flex-direction: column;
`
export const ProfileWrapper=styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
`
export const Profile=styled.img`
    width: 60px;
    height: 60px;
    background-color: transparent;
    
`

export const User=styled.div`
    margin-left: 10px;
`
export const Name=styled.div`
    font-family: SubTitle;
    font-size: 20px;
    color: #FF9900;
    display: flex;
    p{
        color: black;
        margin-right: 5px;
    }
`

export const Detail=styled.div`
    display: flex;    
    font-size: 12px;
    color: #5f5f5f;
    font-family: Regular;
    margin-top: 10px;
`

export const Gender=styled.div``

export const Age=styled.div``

export const Mbti=styled.div``
export const SaveBtn=styled.button`
    width: 100px;
    height: 40px;
    background-color: black;
    color:white;
    font-family: Regular;
    border-radius: 30px;
    font-size: 17px;
    cursor: pointer;
`

export const Body=styled.div`
    width: 93%;
    height:270px;
    //background-color:lightgrey;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RouteName=styled.div`
    height: 30px;
    font-family: SubTitle;
    display: flex;
    align-items: flex-end;
    font-size: 20px;
    margin-left: 10px;
    //background-color: salmon;
`
export const Left2=styled.div`
    display: flex;    
    justify-content: center;
    flex-direction: column;
    width: 590px;
    //background-color: deeppink;
    height: 220px;
`
export const Routes=styled.div`
    display: flex;
    max-width: 600px;
    overflow-x: auto;
    height: 200px;
    //background-color: #61dafb;
    align-items: center;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
        height: 8px; 
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
        background-color: #FF9900; 
        border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: darkorange;
    }
`
export const PlaceWrapper=styled.div`
    display: flex;
    flex-direction: column;
    
    &:not(:first-child) {
        margin-left: 10px; 
    }
    &:not(:first-child) {
        margin-right: 10px; 
    }
    &:first-child {
        margin-left: 20px;
        margin-right: 10px
    }
`
export const Triangle=styled.div`
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #5f5f5f;
    margin-bottom: 20px;
`
export const Triangle2=styled.div`
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 10px solid #5f5f5f;
`
export const Place=styled.img`
    width: 110px;
    height: 110px;
    background-color: pink;
    flex-shrink: 0;
    
`
export const PlaceName=styled.div`
    text-align: center;
    font-family: Regular;
    margin-top: 5px;
    font-size: 17px;
`

export const Mapp=styled.img`
    width: 220px;
    height: 220px;
    background-color: pink;
    object-fit: cover;
`

export const Country=styled.div`
    width: 60px;
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #5f5f5f;
    font-family: Regular;
    margin-left: 30px;
    margin-top: 10px;
`
export const RightArrow=styled.div`
    margin-right: 30px;

`
export const SavedRoute=styled.div`
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    font-family: Regular;
    p{
        margin: 7px;
        font-size: 17px;
    }
`