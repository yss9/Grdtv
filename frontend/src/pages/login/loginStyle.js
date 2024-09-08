import styled  from "@emotion/styled";

export const Wrapper=styled.div`
    
    height: 96vh;
    flex-direction: column;
    overflow: hidden;
    @media (max-width: 1000px) {
        height: 95vh;
    }
`
export const LogoWrapper = styled.div`
    width: auto;
    height: 80px;
    padding-left: 10%;
    padding-top: 3%;
    //background-color: #61dafb;
`
export const Logo = styled.img`
    width: auto;
    height: 90%;
    float: left;
    cursor: pointer;
`
export const LogInWrapper = styled.div`
    font-family: Regular, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //align-items: end;
    float: left;
    width: 500px;
    //height: 75%;
    //background-color: #9bbebe;
    //padding: 270px 30px;
    @media (max-width: 1000px) {
        width: 97vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`
export const LogInInput = styled.input`
    font-family: Regular;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65%;
    max-width: 400px;
    height: 47px;
    margin-bottom: 15px;
    font-size: 13px;
    font-weight: bold;
    border: 1.5px solid lightgray;
    border-radius: 10px;
    padding: 0 10px;
    color:rgba(151, 151, 151, 1);
`
export const LogInButton = styled.div`
    width: 65%;
    max-width: 400px;
    height: 45px;
    margin-top: 20px;
    font-family: Regular;
    background-color: #4E53ED;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 15px;
    font-weight: bold;
    border: 1.5px solid #4E53ED;
    border-radius: 10px;
    padding: 0 10px;
    &:hover {
        cursor: pointer;
    }
`
export const LogInUnderWrapper = styled.div`
    width: 69%;
    max-width: 400px;
    margin-top: 15px;
    font-size: 11px;
    font-weight: bold;
`
export const SignInButton = styled.div`
    float: left;
    &:hover {
        cursor: pointer;
    }
`
export const FindButton = styled.div`
    float: right;
`
export const ImgWrapper = styled.div`
    width: 450px;
    height: 300px;
    //margin: 0 0 0 50px;
    @media (max-width: 1000px) {
        display: none;
    }
`
export const RightImg = styled.img`
    width: 100%;
    overflow: hidden;
`
export const MiddleWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    //background-color: gray;
`