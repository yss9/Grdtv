import styled  from "@emotion/styled";

export const RecWrapper=styled.div`
  width: 100%;
    margin-top: 6vh;
  height: 64vh;
  display: flex;
  align-items: center;
  justify-content: center;
    background-image: url("/Img/routePageBackgroundImg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`
export const RecContainer=styled.div`
  width: 80%;
  height: 60%;
  //background-color: orchid;
`
export const RecTitle=styled.div`
    font-family: Title;
  //background-color: green;
  font-size: 37px;
  font-weight: bold;
`
export const RecSubTitle=styled.div`
    margin-top: 15px;
  height: 20%;
  font-size: 15px;
  font-family: Regular;
  p {
    padding: 5px 0;
  }
`
export const RecBtnWrapper=styled.div`
  height: 85%;
  //background-color: palevioletred;
  display: flex;
  align-items: center;
`
export const RecBtn=styled.button`
    width: 15%;
    height: 12%;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: Regular;
    background-color: rgba(78, 83, 238, 1);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 17px;

    p {
        position: absolute;
        right: 35%;
    }

    svg {
        margin-left: 0;
        position: absolute;
        right: 10%;
    }
    &:hover {
        background-color: #4E53EE;
    }
`
export const RecInput = styled.input`
    padding: 1em;
    font-family: Regular;
    width: 220%;
    height: 5px;
    margin-bottom: 1em;
    outline: none;
    border: 2px solid transparent;
    border-radius: 20px;
    background-image: linear-gradient(white, white), linear-gradient(to right, #b7b8e7, #4E53EE, #b7b8e7);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    ::placeholder{
        color: black;
    }
    
`


export const RecList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 120px;
    overflow-y: auto;
    border-radius: 3px;
    width: 235%;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
`;

export const RecListItem = styled.li`
    padding: 0.7em;
    font-size: 13px;
    font-family: Regular;
    background-color: rgba(0, 0, 0, 0.45);
    color: white;
    cursor: pointer;
    

    &:hover {
        background-color: #f0f0f0;
    }
`;
export const RecListCountry = styled.p`
    font-size: 10px;
    font-family: Regular;
    color: lightgray;
    margin-top: 5px;
`
