import styled  from "@emotion/styled";

export const ModalDiv = styled.div`
    width: ${({step}) => (step === 0 ? '500px': '650px')};
    height: ${({step}) => (step === 0 ? '330px': '450px')};
    background-color: rgba(255, 255, 255, 0.74);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px rgba(159, 159, 159, 0.14);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    padding-bottom: 20px;
`
export const Character = styled.img`
    width: 170px;
    height: auto;
    position: absolute;
    top: -55px;
    display: ${({step}) => (step === 13 ? 'none':'')};
`
export const ProcessBar = styled.div`
    width: 550px;
    height: 20px;
    background-color: #E4E4E4;
    border-radius: 50px;
    display: ${({ step }) => ((step === 13) || (step === 0) ? `none` : '')};
`
export const ContentDiv = styled.div`
    width: 550px;
    height: 300px;
    margin-top: ${({step}) => (step === 13 ? '0': '30px')};
    justify-content: center;
    text-align: center;
    position: relative;
    //background-color: lavender;
`
export const Process = styled.div`
    width: ${({ step }) => `calc(${step} * 100% / 12)`};
    height: 100%;
    background-color: #FF9900;
    border-radius: 50px;
    transition: 0.5s ease;
`
export const Question = styled.div`
    text-align: center;
    margin: ${({step}) => (step === 0 ? ('70px 0 40px 0') : ('60px 0'))};
    font-size: 22px;
    font-weight: bold;
    line-height: 1.5;
    
`
export const Answer = styled.div`
    width: ${({step}) => (step === 0 ? '350px': '400px')};
    max-height: 30px;
    background-color: #4E53ED;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    color: white;
    cursor: pointer;
    padding: 17px 10px;
    line-height: 1.5;
`
export const MBTIResult = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #4E53ED;
    margin-top: 30px;
`
export const ResultCharacter = styled.img`
    width: 200px;
    height: auto;
`
export const ResultSentence = styled.div`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 40px;
    cursor: pointer;
`
export const ResultButton = styled.div`
    cursor: pointer;
    width: 230px;
    height: 55px;
    font-size: 19px;
    margin: 30px 10px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #4E53ED;
    color: white;
`
export const ResultButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`