import {Wrapper, ConsentWrapper, IdInput, IdWrapper, NameInput, NameWrapper, PwWrapper,
    PwInput, EmailWrapper,EmailInput, NextButton,
    SubTitle, ErrorMsg, PwCheckWrapper, PwCheckInput} from './signInStyle'
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwCheckError, setPwCheckError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pwMatchError, setPwMatchError] = useState("");

    const onChangeName=(event)=>{
        setName(event.target.value)
        if(event.target.value !== ""){
            setNameError("")
        }
    }

    const onChangeId=(event)=>{
        const userInput = event.target.value;

        // 정규식을 사용하여 한글 여부 확인
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const isKorean = koreanRegex.test(userInput);

        setId(userInput);

        if (isKorean) {
            setIdError("영어와 숫자로만 입력해주세요.");
        } else {
            setIdError("");
        }
    }
    const onChangePw = (event) =>{
        setPw(event.target.value)
        if(event.target.value !== ""){
            setPwError("")
        }
    }

    const onChangePwCheck = (event) => {
        const newPasswordCheck = event.target.value;
        setPwCheck(newPasswordCheck);

        if (newPasswordCheck !== pw) {
            setPwMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setPwMatchError("");
        }
    }

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            setEmailError("");
            return true; // 유효한 이메일 형식이면 true 반환
        } else {
            setEmailError("올바른 이메일 형식을 입력해주세요.");
            return false; // 올바르지 않은 이메일 형식이면 false 반환
        }
    };

    const onClickNext = () => {
        const isValidEmail = validateEmail();

        // 초기화
        setNameError("");
        setIdError("");
        setPwError("");
        setPwCheckError("");
        setPwMatchError("");
        setEmailError("");

        // 각 필드에 대한 에러 체크
        if (!name) {
            setNameError("이름을 입력해주세요.");
        }

        if (!id) {
            setIdError("아이디를 입력해주세요.");
        } else {
            const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            const isKorean = koreanRegex.test(id);
            if (isKorean) {
                setIdError("영어와 숫자로만 입력해주세요.");
            }
        }

        if (!pw) {
            setPwError("비밀번호를 입력해주세요");
        }

        if (!pwCheck) {
            setPwCheckError("비밀번호를 입력해주세요");
        }

        if (pw !== pwCheck) {
            setPwMatchError("비밀번호가 일치하지 않습니다.");
        }

        if (!isValidEmail) {
            setEmailError("올바른 이메일 형식을 입력해주세요.");
        }

        // 모든 에러가 없을 때에만 회원가입 완료
        if (isValidEmail && name && pw && pwCheck && !pwMatchError) {
            axios.post('http://localhost:8080/api/users/signup', {
                name: name,
                email: email,
                password: pw
            })
                .then(response => {
                    console.log(response.data);
                    alert("회원가입 완료!");
                    navigate('/logIn');
                })
                .catch(error => {
                    console.error(error);
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                });
        } else {
            alert("모든 정보를 올바르게 기입해 주세요.");
        }
    };


    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickNext();
        }
    }

    return(
        <>
            <Wrapper>
                {/*<TitleWrapper>*/}
                {/*    <Title>*/}
                {/*        MOFY*/}
                {/*    </Title>*/}
                {/*</TitleWrapper>*/}
                <SubTitle>
                    회원가입
                </SubTitle>
                <ConsentWrapper>
                    <NameWrapper>
                        <NameInput type="text " maxlength={20} size="50" placeholder="이름" onChange={onChangeName} onKeyPress={enterKeyPress} />
                        <ErrorMsg>{nameError}</ErrorMsg>
                    </NameWrapper>
                    <IdWrapper>
                        <IdInput type="text " maxlength={20} size="50" placeholder="아이디" onChange={onChangeId} onKeyPress={enterKeyPress}/>
                        <ErrorMsg>{idError}</ErrorMsg>
                    </IdWrapper>
                    <PwWrapper>
                        <PwInput type="password" maxlength={20} size="50" placeholder="비밀번호" onChange={onChangePw} onKeyPress={enterKeyPress}/>
                        <ErrorMsg>{pwError}</ErrorMsg>
                    </PwWrapper>
                    <PwCheckWrapper>
                        <PwCheckInput type="password" maxlength={20} size="50" placeholder="비밀번호 확인" onChange={onChangePwCheck} onKeyPress={enterKeyPress}/>
                        <ErrorMsg>{pwCheckError}</ErrorMsg>
                        <ErrorMsg>{pwMatchError}</ErrorMsg>
                    </PwCheckWrapper>
                    <EmailWrapper>
                        <EmailInput type="text " maxlength={20} size="50" placeholder="이메일" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail();
                        }} onKeyPress={enterKeyPress}/>
                        <ErrorMsg>{emailError}</ErrorMsg>
                    </EmailWrapper>
                </ConsentWrapper>
                <NextButton onClick={onClickNext}>
                    다음
                </NextButton>
            </Wrapper>
        </>

    )
}