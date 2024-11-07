import styled  from "@emotion/styled";

export const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
export const Container=styled.div`
    width: 1500px;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const MbtiTitleContainer=styled.div`
    display: flex;
    width: 1500px;
    height: 1000px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const MbtiTitleWrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 255px;
    //background-color: pink;

`
export const MbtiTitle=styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #4E53ED;
    font-family: "Title";
    margin-top: 2rem;
`

export const MbtiSubTitle=styled.div`
    font-size: 17px;
    color: #515151;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;

    p {
        padding: 5px 0;
        font-family: "SubTitle";
        color: black;
    }
`
export const WriteMbtiBtnWrapper=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
`
export const WriteMbtiBtn=styled.button`
    width: 160px;
    height: 40px;
    border-radius: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    border: none;
    cursor: pointer;
    p{
        margin-left: 1.2rem;
        font-size: 0.9rem;
        color: white;
        font-family: "Regular";
    }
    svg{
        margin-right: 10px;
    }
`

export const Horizonalline=styled.div`
    height: 1px;
    width: 70%;
    background-color: #9b9b9b;
    margin: 30px;

`
export const MbtiContainer=styled.div`
    margin-top: 20px;
    width: 520px;
`

export const Mbti = styled.button`
    width: 40px;
    text-align: center;
    font-size: 30px;
    color: #ff9900;
    background-color: white;
    font-family: "Title";
    border-radius: 30px;
    appearance: none;
    position: relative;
    border: 2px solid #4353ed;
    margin-left:2px;
    cursor: pointer;
    
    :hover{
        color: #4353ed;
    }   

`;

export const Explain=styled.text`
    font-size: 25px;
    color: #515151;
    font-family: "SubTitle";
    margin-left: 3px;

`
export const Explain2=styled.text`
    width: 1000px;
    margin-top: 30px;
    justify-content: center;
    display: flex;
    position: relative;
    p{
        font-size: 15px;
        color: #515151;
        font-family: "SubTitle";
        width: 480px;
        margin-top: 10px;
    }
`
export const GlopleCharacterImg=styled.img`
    position: absolute;
    width: 120px;
    height: auto;
    margin-right: 620px;
`