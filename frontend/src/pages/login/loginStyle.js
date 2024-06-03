import styled  from "@emotion/styled";

export const Wrapper=styled.div`
    //display: flex;
    //justify-content: center; /* 수평 정렬 설정 */
    //align-items: center; /* 수직 정렬 설정 */
    height: 97vh; /* 뷰포트 높이만큼 컨테이너의 높이 설정 */
    overflow: hidden;
    //background-color: beige;
    flex-direction: column;
`
export const Logo = styled.div`

    font-weight: bolder;
    font-size: 30px;
    margin-top: 30px;
    margin-left: 8vw;
    width: auto;
    height: auto;
    //background-color: #bbcbaa;
`
export const LogInWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    float: left;
    width: 40vw;
    height: 75vh;
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

export const RightImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    float: right;
    width: 50vw;
    height: 75vh;
    //background-color: #b5ded1;
    //padding: 20px;
`
export const LogInInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    max-width: 400px;
    height: 50px;
    margin-bottom: 15px;
    background-color: lightgray;
    font-size: 13px;
    font-weight: bold;
`
export const LogInButton = styled.div`
    width: 70%;
    max-width: 400px;
    height: 50px;
    margin-top: 20px;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: bold;

`
export const LogInUnderWrapper = styled.div`
    width: 70%;
    max-width: 400px;
    margin-top: 15px;
    font-size: 11px;
    font-weight: bold;
`
export const SignInButton = styled.button`
    float: left;
`
export const FindButton = styled.div`
    float: right;
`
export const ImgWrapper = styled.div`
    width: 500px;
    height: 300px;
    overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 합니다. */
`
export const RightImg = styled.img`
    width: 100%; /* 이미지를 부모 요소에 맞춰 너비를 100%로 설정합니다. */
    height: auto; /* 이미지의 높이를 자동으로 조정하여 비율을 유지합니다. */
    display: block;
`
