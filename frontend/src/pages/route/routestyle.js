import styled  from "@emotion/styled";

export const RecWrapper=styled.div`
  width: 100%;
    margin-top: 3vh;
  height: 70vh;
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
    height: 25%;
  //background-color: green;
  font-size: 37px;
  font-weight: bold;
  color: #4E53EE;
`
export const RecSubTitle=styled.div`
  height: 20%;
  font-size: 15px;
  //background-color: #61dafb;
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
    width: 13%;
    height: 20%;
    border-radius: 2em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;

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
    width: 300px;
    height: 5px;
    margin-bottom: 1em;
    outline: none;
    border: 2px solid transparent;
    border-radius: 20px;
    background-image: linear-gradient(white, white), linear-gradient(to right, #b7b8e7, #4E53EE, #b7b8e7);
    background-origin: border-box;
    background-clip: padding-box, border-box;
`


export const RecList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 120px;
    overflow-y: auto;
    border-radius: 3px;
    
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
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.45);
    color: white;
    cursor: pointer;
    

    &:hover {
        background-color: #f0f0f0;
    }
`;
export const RecListCountry = styled.p`
    font-size: 10px;
    font-weight: normal;
    color: lightgray;
    margin-top: 5px;
`
