import styled  from "@emotion/styled";

export const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Wrapper = styled.div`
    width: 1500px;
    height: 1900px;
    //background-color: lightcyan;
`
export const SubTitleWrapper=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`
export const SubTitle=styled.div`
    text-align: center;
    //background-color: gray;
    font-size: 22px;
    color: #515151;
    font-family: "SubTitle";
    display: flex;
    p{
        color:#ff9900;
    }
`
export const SearchBarWrapper=styled.div`
    height: 5rem;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Icon=styled.div`
    width: 4%;
    height: 70%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px 0 0 15px;
    border-width: 2px 0 2px 2px; /* top, right, bottom, left */
    border-style: solid;
    border-color: #4e53ed;
    cursor: pointer;
`
export const SearchBarContainer=styled.div`
    width: 40%;
    height: 70%;
    border-radius: 0 15px 15px 0;
    border-width: 2px 2px 2px 0;
    border-style: solid;
    border-color: #4e53ed;
    background-color: white;
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
    width: 12%;
    height: 100%;
    border-radius: 0 15px 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SubTitle2=styled.div`
    width: 85%;
    font-size: 22px;
    color: #515151;
    font-family: "Regular";
    font-weight: bold;
    margin-top: 3rem;
    display: flex;
    justify-content: center;

    p{
        color: #4e53ed;
    }

`
export const AgentContainer=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    flex-direction: column;
    // background-color: green;
`

export const Agents=styled.div`
    width: 57%;
    height: 32rem;
    //background-color: gray;
    display: flex;
    justify-content: center;
`
export const Agents2=styled.div`
    width: 65%;
    height: 20.5rem;
    //background-color: gray;
    display: flex;
    justify-content: space-between;
`

export const SelectWrapper=styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`
export const SelectContainer=styled.div`
    //margin-left: 60vh;
    display: flex;
    align-items: center;
    width: 85%;
    //background-color: #61dafb;
    justify-content: space-between;

`
export const Select=styled.select`
    width: 20rem;
    height: 80%;
    background-color: #d9d9d9;
    border: none;
    padding: 15px;
    font-family: "Regular";
    font-size: 16px;

`
export const SeeAllBtn=styled.button`
    display: flex;
  font-size: 15px;
  background-color: transparent;
  justify-content: center;
  align-items: flex-end;
  height: 4rem;
  cursor: pointer;
  border: none;
  margin-right: 10rem;
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
export const DownWrapper=styled.div`
    background-color: #F4F6F8;
    margin-top: 80px;
`
