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
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Cookies from 'js-cookie';

export default function GloplesetPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [glopler, setGlopler] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
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
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const onClickGlopler = (isGlopler) => {
        setGlopler(isGlopler);
    };

    const goToFirstPage = () => setStep(1);
    const goToSecondPage = () => setStep(2);
    const goToThirdPage = () => setStep(3);
    const goToFourthPage = () => setStep(4);


    const onClickSubmit = async () => {
        // Check if the token is valid and decode it
        const token = Cookies.get('jwt'); // Assuming token is stored in cookies
        if (!token) {
            console.error("Token is missing.");
            alert("로그인이 필요합니다.");
            return;
        }

        let userId;
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.userId; // Use 'id' or the key for userId in your token payload
        } catch (error) {
            console.error("Invalid token:", error);
            alert("잘못된 토큰입니다.");
            return;
        }

        // Check if required fields are filled
        if (!selectedCountry || !verificationFile) {
            alert("모든 필드를 채워 주세요.");
            return;
        }

        // Create the agentDetails object as a JSON object
        const agentDetails = {
            agentCountry: selectedCountry,
            introduction: name,
            hashtags: hashtags,  // Directly use the array
            specIntroduction: specs  // Directly use the array
        };

        // Create FormData and append the JSON object as a string
        const formData = new FormData();
        formData.append('agentDetails', new Blob([JSON.stringify(agentDetails)], { type: 'application/json' }));

        // Append the file if it exists
        if (verificationFile) {
            formData.append('verificationFile', verificationFile);
        }

        console.log("FormData contents:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/users/apply-agent?userId=${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Submission successful");
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };




    return (
        <>
            <Reset />
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
                                handleVerificationFileChange={handleVerificationFileChange}
                                handleCountryChange={handleCountryChange}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                            />
                        )}
                        {step === 3 && (
                            <Third
                                goToSecondPage={goToSecondPage}
                                goToFourthPage={goToFourthPage}
                                name={name}
                                setName={setName}
                                hashtags={hashtags}
                                setHashtags={setHashtags}
                                specs={specs}
                                setSpecs={setSpecs}
                                onClickSubmit={onClickSubmit}
                            />
                        )}
                        {step === 4 && (
                            <Forth
                                goToThirdPage={goToThirdPage}
                                onClickMy={onClickMy}
                            />
                        )}
                    </AnimatePresence>
                </ContentsWrapper>
            </Wrapper>
        </>
    );
}
