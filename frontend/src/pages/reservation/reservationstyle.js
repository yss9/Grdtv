import styled  from "@emotion/styled";

export const SubTitleWrapper=styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1vh;
`
export const SubTitle=styled.div`
    width: 50%;
    height: 4vh;
    text-align: center;
    //background-color: gray;
    font-size: 22px;
    color: #515151;
`
export const SearchBarWrapper=styled.div`
    height: 7vh;
    margin-top: 3vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Icon=styled.div`
    width: 4%;
    height: 100%;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px 0 0 15px;
    cursor: pointer;
    //background-color: #61dafb;
`
export const SearchBarContainer=styled.div`
    width: 37%;
    height: 100%;
    border-radius: 0 15px 15px 0;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const Search=styled.input`
    width: 88%;
    height: 100%;
    border-radius: 15px 0 0 15px;
    border: none;
    background-color: transparent;
    font-size:17px;
    margin-left: 10px;
    :focus {
        outline: none;
    }
    ::placeholder {
        font-size: 16px;
        color: black;
    }
`
export const Magnifier=styled.div`
    background-color: #8e8e8e;
    width: 12%;
    height: 100%;
    border-radius: 0 15px 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SubTitle2=styled.div`
    width: 95%;
    font-size: 22px;
    margin-top: 8vh;
    color: #515151;
`
export const AgentContainer=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4vh;
    flex-direction: column;
    // background-color: green;
`

export const Agents=styled.div`
    width: 57%;
    height: 32rem;
    //background-color: gray;
    display: flex;
    justify-content: space-between;
`
export const GaugeBarWrapper=styled.div`
    width: 45%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    margin-bottom: 3rem;
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