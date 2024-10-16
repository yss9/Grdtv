import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const SearchBarWrapper = styled.div`
    width: 1500px;
    height: 8vh;
    //background-color: yellow;
    margin-top: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const SearchBarContainer = styled.div`
    width: 40%;
    height: 100%;
    border-radius: ${(props) => (props.hasAutoComplete ? '15px 15px 0 0' : '15px')};
    background-color: white;
    border: 2px solid #4e53ed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: border-radius 0.3s ease;
`;

export const Pin = styled.div`
    background-color: transparent;
    width: 7%;
    height: 70%;
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Search = styled.input`
    background-color: transparent;
    width: 75%;
    height: 100%;
    border: none;
    font-size: 17px;

    :focus {
        outline: none;
    }

`
export const Magnifier = styled.div`
    width: 12%;
    height: 100%;
    border-radius: 0 15px 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    //overflow: hidden;
`
export const SubTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
export const SubTitle1 = styled.div`
    width: 80%;
    //background-color: pink;
    margin-top: 70px;
    font-size: 25px;
`
export const BestReviewTitle = styled.text`
    color: #dd3f3f;
    font-weight: bolder;
    font-family: "Regular";
`
export const BestReiviewer = styled.text`
    color: #8e8e8e;
    font-weight: bolder;
    font-family: "Regular";

`
export const BestReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1500px;
`;

export const DownContainer=styled.div`
    width: 1500px;
    height: auto;
    display: flex;
    justify-content: center;
    //background-color: green;
`
export const DownWrapper=styled.div`
    width: 1200px;
    //background-color: yellowgreen;
`
export const BestReviews = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 20px;
    overflow: hidden;
    font-family: Regular;

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
    background-color: #ff9900;
    }
`;
export const SubTitle2 = styled.div`
    width: 100%;
    margin-top: 70px;
    font-size: 25px;
    //background-color: coral;
    display: flex;
    align-items: center;

`
export const GoTravelTitle = styled.text`
    font-weight: bolder;
    color: black;
    font-family: "Regular";

`
export const SelectContainer = styled.div`
    margin-left: 60vh;
    display: flex;
    align-items: center;

`
export const Select = styled.select`
    width: 170px;
    height: 100%;
    background-color: #d9d9d9;
    border: none;
    padding: 15px;
    font-family: "Regular";
`
export const BlogWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    //background-color: blue;
`
export const BlogContainer = styled.div`
    justify-content: space-between;
    width: 80%;
    background-color: palegoldenrod;
    margin-top: 50px;
    display: flex;
    font-family: Regular;
`
export const Blogs = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    //background-color: pink;
`

export const MyMenuWrapper = styled.div`
    width: 27%;
    height: 700px;
    background-color: #f5f6f8;
    border-radius: 15px;

`
export const MyMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const Profile2 = styled.div`
    width: 100%;
    height: 12vh;
    //background-color: palevioletred;
    border-radius: 15px 15px 0 0;
    display: flex;
    align-items: center;
    //margin: 10px;
`
export const PImg2 = styled.img`
    width: 9vh;
    height: 9vh;
    border-radius: 50%;
    background-color: #7d7d7d;
    margin: 20px 0 20px 20px;
    object-fit: cover; /* 이미지를 가득 채우도록 설정 */

`;
export const PContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 27vh;
    height: 100%;
    margin-left: 10px;
`;
export const Pname2 = styled.div`
    width: 100%;
    height: 56%;
    //background-color: orchid;
    display: flex;
    align-items: center;
    color: #515151;
    font-size: 22px;
    margin: 7px 0 -5px 0;
    font-family: "Regular";

`;
export const PIntro = styled.div`
    width: 100%;
    height: 44%;
    display: flex;
    align-items: flex-start;
    font-size: 17px;
    color: #515151;
    font-family: "Regular";

`;
export const ButtonContainer = styled.div`
    width: 100%;
    height: 60px;
    background-color: #4e53ed;
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
export const MyWrites = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    margin-left: 8px;
    cursor: pointer;
    font-size: 22px;
    color: white;
    font-family: "Regular";

`
export const GoWrite = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    margin-right: 8px;
    cursor: pointer;
    font-size: 22px;
    color: white;
    font-family: "Regular";

`
export const BookMarkContainer = styled.div`
    width: 100%;
    height: 45rem;
    //background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const BookMarkTitle = styled.div`
    width: 80%;
    height: 5vh;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin: 10px 0 10px 0;
    color: #8e8e8e;
    font-family: "Regular";

`
export const BookMarked1 = styled.div`
    background-image: url("/favorite1.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 80%;
    height: 30%;
    background-color: gray;
    margin: 10px;
    border-radius: 20px;
`


export const BookMarked2 = styled.div`
    background-image: url("/favorite2.png");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    width: 80%;
    height: 30%;
    background-color: gray;
    margin: 7px;
`
export const AutoCompleteList = styled.ul`
  position: absolute;
  width: 40%;
  list-style-type: none;
  padding: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
    border-radius: 0 0 15px 15px;
    background-color: white;
    border: 2px solid #4e53ed;

  li {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const AutoCompleteListWrapper = styled.div`
    width: 1500px;
    display: flex;
    justify-content: center;
    
`