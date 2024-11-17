import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    display:flex;
    flex-direction:column;
    align-items:center;
    ::-webkit-scrollbar {
        display: none; /* Safari 및 Chrome 등의 WebKit 기반 브라우저용 */
    }
`;


export const Map = styled.div`
    width: 100%;
    position: relative;
    max-height: 84vh;
    overflow-y: scroll;
    overflow-x: hidden; /* 필요 시 조정 */
    display: flex;
    justify-content: center;

    svg path:hover {
        fill: #4e53ed;
        animation: blink 1.5s steps(5, start) infinite;

    }

    ::-webkit-scrollbar {
        display: none;
    }
    
`;



export const Background = styled.div`
    display: flex;
    min-height: 100vh;
    background: linear-gradient(296.58deg, rgba(78, 83, 237, 0.2) -4.34%, rgba(36, 38, 110, 0.2) 48.36%, rgba(29, 31, 88, 0.2) 61.81%, rgba(0, 0, 0, 0.2) 95.7%), #1C1C1C;
    flex-direction: column;
`;

export const BtnWrapper=styled.div`
  width: 1500px;
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

export const GoReservationBtn=styled.button`
    width: 70%;
    padding: 10px;
    background-color: royalblue;
    border: none;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 15%;
`
export const GaugeBarWrapper=styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`
export const GaugeBar = styled.div`
  width: 98%;
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
    background-color: #ff9900;
    border-radius: 100px;
    transition: width 0.5s ease;
  }
`;