import styled from "@emotion/styled";

export const Wrapper = styled.div`
    overflow: hidden; /* 가로 스크롤바 감춤 */
    display:flex;
    flex-direction:column;

    ::-webkit-scrollbar {
        display: none; /* Safari 및 Chrome 등의 WebKit 기반 브라우저용 */
    }
`;

export const Map = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg path:hover {
        fill: #4E53ED;
    }
`;

export const Popup = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.82);
    border: 3px solid #33395b;
    border-radius: 30px 0 30px 30px;
    padding: 30px;
    z-index: 1000;
    width: 200px;
    height: 200px;
`;

export const Background = styled.div`
    background-image: url("/backColors.jpg");
    height: 900px;
    display: flex;
    flex-direction: column;
`;

export const BtnWrapper=styled.div`
  width: 1530px;
  margin-top: 25px;
  //background-color: pink;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const LoginBtn=styled.button`
    background-color: #ff9900;
  height: 30px;
  width: 100px;
  border: none;
  border-radius: 15px 0 0 15px;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  color: white;
  //margin-top: 20px;
`
export const RegisterBtn=styled.button`
  background-color: #ff9900;
  height: 30px;
  width: 100px;
  margin-right: 4%;
  border: none;
  border-radius: 0 15px 15px 0;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  color: white;

`
export const VirticalLineWrapper=styled.div`
  height: 30px;
  width: 2px;
  background-color: #ff9900;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VirticalLine = styled.div`
  position: relative;
    height: 18px;
    width: 2px;
    //margin: 0 1rem;
    background-color: white;
`;