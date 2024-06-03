import {
    Wrapper, Logo, LogInWrapper, RightImg, LogInInput,
    LogInButton, SignInButton, FindButton,
    LogInUnderWrapper, RightImgWrapper, ImgWrapper} from './loginStyle'
import {useState} from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { motion } from "framer-motion";

export default function LoginPage(){

    const navigate = useNavigate();

    const [id, setId]= useState("");
    const [pw, setPw] = useState("");

    const [idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");

    const onChangeId=(event)=>{
        setId(event.target.value)
        if(event.target.value !== ""){
            setIdError("")
        }
    }
    const onChangePw=(event) =>{
        setPw(event.target.value)
        if(event.target.value !== ""){
            setPwError("")
        }
    }
    const onClickLogin = () => {
        if (!id) {
            setIdError("아이디를 입력해주세요.");
        }
        if (!pw) {
            setPwError("비밀번호를 입력해주세요");
        }
        if (id && pw) {
            axios.post('http://localhost:8080/api/users/login', {
                email: id,
                password: pw
            })
                .then(response => {
                    Cookies.set("token", response.data);
                    // console.log(response.data);
                    alert("로그인 성공!");
                    navigate('/chat');

                })
                .catch(error => {
                    console.error('Login failed:', error.response.status);
                });
        }
    }

    const onClickSignIn = () => {
        navigate('/signup');
    }

    const onClickHome = () => {
        window.location.href = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80&oquery=%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85&tqi=ilvNYlqVOsCssCrFfjVssssssVh-197062";
    }

    const onClickFindPw = () => {
        window.location.href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EC%B0%BE%EA%B8%B0&oquery=%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80&tqi=ilvN0lqVOZCssaggDrwssssstbG-301446";
    }

    const onClickFindId=()=>{
        window.location.href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EC%95%84%EC%9D%B4%EB%94%94%EC%B0%BE%EA%B8%B0&oquery=%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EC%B0%BE%EA%B8%B0&tqi=ilvN3sqVOswss52kK3Nsssssskh-290383";
    }

    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickLogin();
        }
    }

    return(
        <>
            {/*<p>id</p>*/}
            {/*<input onChange={onChangeId}/>*/}
            {/*<p>pw</p>*/}
            {/*<input onChange={onChangePw}/>*/}
            {/*<button onClick={onClickLogin}>로그인</button>*/}

            <motion.div
                className="loginPage"
                intial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Wrapper>
                    <Logo>LOGO</Logo>
                    <LogInWrapper>
                        <LogInInput>&nbsp;&nbsp;&nbsp;아이디</LogInInput>
                        <LogInInput>&nbsp;&nbsp;&nbsp;비밀번호</LogInInput>
                        <LogInButton>로그인</LogInButton>
                        <LogInUnderWrapper>
                            <SignInButton onClick={onClickSignIn}>회원가입</SignInButton>
                            <FindButton>아이디·비밀번호 찾기</FindButton>
                        </LogInUnderWrapper>
                    </LogInWrapper>
                    <RightImgWrapper>
                        <ImgWrapper><RightImg src="https://via.placeholder.com/500x300"></RightImg></ImgWrapper>

                    </RightImgWrapper>
                </Wrapper>
            </motion.div>
        </>
    )
}