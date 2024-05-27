import styled  from "@emotion/styled";

export const MbtiTitleContainer=styled.div`
    width: 100%;
    height: 105vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //background-color: red;
`
export const MbtiTitle=styled.text`
    font-size: 30px;
    font-weight: bold;
    color: #515151;
    height: 15%;
    display: flex;
    flex-direction: column;
    // background-color: pink;
    justify-content: flex-end;
`

export const MbtiSubTitle=styled.text`
    font-size: 17px;
    font-weight: bold;
    color: #515151;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 17%;
    p {
        padding: 5px 0;
    }
`
export const WriteMbtiBtnWrapper=styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 15%;
    justify-content: center;
`
export const WriteMbtiBtn=styled.button`
    width: 16%;
    height: 65%;
    border-radius: 25px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: #d9d9d9;
    border: none;
    cursor: pointer;
    p{
        margin: 5%;
    }
    svg{
        margin-left: 0;
        position: absolute;
        right: 6%;
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
`

export const Mbti=styled.text`
    font-size: 30px;
    color: #515151;

`
export const Explain=styled.text`
    font-size: 25px;
    color: #515151;

`
