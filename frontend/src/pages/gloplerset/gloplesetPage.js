import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Reset } from "styled-reset";
import {
    Wrapper,
    Logo,
    Progress,
    ProgressBar,
    ContentsWrapper,
    LogoWrapper,
} from "./gloplesetStyle";
import { useNavigate } from "react-router-dom";
import First from "./components/1";
import Second from "./components/2";
import Third from "./components/3";
import Forth from "./components/4";

export default function GloplesetPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [glopler, setGlopler] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");

    // 추가된 상태
    const [name, setName] = useState("소개 부분입니다.");
    const [hashtags, setHashtags] = useState(["해시태그 부분입니다"]);
    const [specs, setSpecs] = useState(["스펙을 입력해주세요", "ex) 미국거주 10년"]);

    const [verificationFile, setVerificationFile] = useState(null);

    const handleVerificationFileChange = (event) => {
        setVerificationFile(event.target.files[0]);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const onClickMy = () => {
        navigate('/my');
    }
    const handleGoHome = () => {
        navigate('/')
    }
    const onClickGlopler = (isGlopler) => {
        setGlopler(isGlopler);
    }

    const goToFirstPage = () => setStep(1);
    const goToSecondPage = () => setStep(2);
    const goToThirdPage = () => setStep(3);
    const goToFourthPage = () => setStep(4);
    const onClickSubmit = () => {}

    return (
        <>
            <Reset/>
            <Wrapper>
                <LogoWrapper>
                    <Logo onClick={handleGoHome} src='/Img/Logo2.png'></Logo>
                </LogoWrapper>
                <ContentsWrapper>
                    <ProgressBar>
                        <Progress style={{ marginLeft: step === 1 ? "0" : step === 2 ? "30%" : step === 3 ? "60%" : step === 4 ? "80%" : "100%" }}></Progress>
                    </ProgressBar>
                    <AnimatePresence>
                        {step === 1 && (
                            <First
                                onClickGlopler={onClickGlopler}
                                goToSecondPage={goToSecondPage}
                            />
                        )}
                        {step === 2 && (
                            <Second
                                goToFirstPage={goToFirstPage}
                                goToThirdPage={goToThirdPage}
                                handleCountryChange={handleCountryChange}
                                selectedCountry={selectedCountry} //나라
                                setSelectedCountry={setSelectedCountry}
                            />
                        )}
                        {step === 3 && (
                            <Third
                                goToSecondPage={goToSecondPage}
                                goToFourthPage={goToFourthPage}
                                name={name} //소개
                                setName={setName}
                                hashtags={hashtags} //해시태그
                                setHashtags={setHashtags}
                                specs={specs} //스펙
                                setSpecs={setSpecs}
                            />
                        )}
                        {step === 4 && (
                            <Forth
                                goToThirdPage={goToThirdPage}
                                onClickSubmit={onClickSubmit}
                                onClickMy={onClickMy}
                            />
                        )}
                    </AnimatePresence>
                </ContentsWrapper>
            </Wrapper>
        </>
    );
}
