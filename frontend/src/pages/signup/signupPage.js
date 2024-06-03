import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wrapper,
    Logo,
    FormContainer,
    Progress,
    ProgressBar,
    GenderButtonWrapper,
    GenderButton,
    NextButton,
    FormGroup,
    Input,
    ContentsWrapper,
    InputText,
    NextButtonWrapper,
    ButtonContainer,
    BackButton,
    BoldText,
    PercentageInput,
    MBTISwitchWrapper,
    MBTISwitchContainer,
    SetCenter,
    RadioButton,
    RadioButtonComment,
    RadioButtonWrapper, RadioButtonSubComment, BoldSubText, UserImg, FinishText, GoToLoginPage
} from "./signupStyle";
import {Switch as AntSwitch} from "antd";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


export default function SignupPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const goToFirstPage = () => {
        setStep(1);
    };
    const goToSecondPage = () => {
        setStep(2);
    };
    const goToThirdPage = () => {
        setStep(3);
    };
    const goToFourthPage = () => {
        setStep(4);
    };

    const handlePercentageChange = (key, value) => {
        setMbti((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                percentage: value,
            },
        }));
    };

    const pageVariants = {
        initial: { x: "100%" },
        enter: { x: 0, transition: { duration: 0.5 } },
        exit: { x: "-100%", transition: { duration: 0.5 } },
    };


    const [mbti, setMbti] = useState({
        IE: { active: true, percentage: '' },
        SN: { active: true, percentage: '' },
        FT: { active: true, percentage: '' },
        PJ: { active: true, percentage: '' },
    });


    const toggleMBTI = (key) => {
        setMbti((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                active: !prev[key].active,
            },
        }));
    };
    const MBTISwitch = ({ label1, label2, isActive, onToggle, percentage, onPercentageChange }) => {
        return (
            <MBTISwitchWrapper>
                <div>
                    <SetCenter>
                        {label1}&nbsp;&nbsp;{label2}
                    </SetCenter>
                    <AntSwitch checked={isActive} onChange={onToggle} style={{ marginLeft: 10, marginRight: 10, backgroundColor:"lightgray" }} />

                </div>
                <PercentageInput
                    type="text"
                    value={percentage}
                    onChange={onPercentageChange}
                    placeholder="%"
                />
            </MBTISwitchWrapper>
        );
    };
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onClickLogin = () => {
        navigate('/login');
    }
    return (
        <>
            <Wrapper>
                <Logo>LOGO</Logo>
                <ContentsWrapper>
                    <ProgressBar>
                        <Progress style={{ marginLeft: step === 1 ? "0" : step === 2 ? "25%" : step === 3 ? "50%" : "75%" }}></Progress>
                    </ProgressBar>
                    <AnimatePresence>
                        {step === 1 && (
                            <FormContainer>
                                <motion.div
                                    key="step1"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width:"100%"}}
                                >
                                    <BoldText>이름과 나이,<br/>
                                        성별을 알려주세요.</BoldText>
                                    <FormGroup>
                                        <InputText>이름</InputText>
                                        <Input type="text" placeholder="이름을 입력해주세요."/>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputText>생년월일</InputText>
                                        <Input type="text" placeholder="ex)020323"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputText>성별</InputText>
                                        <GenderButtonWrapper>
                                            <GenderButton>남성</GenderButton>
                                            <GenderButton>여성</GenderButton>
                                        </GenderButtonWrapper>
                                    </FormGroup>
                                    <NextButtonWrapper>
                                        <NextButton onClick={goToSecondPage}>다음</NextButton>
                                    </NextButtonWrapper>
                                </motion.div>
                            </FormContainer>

                        )}
                        {step === 2 && (
                            <FormContainer>
                                <motion.div
                                    key="step2"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width:"100%"}}
                                >
                                    <BoldText>MBTI를 알려주세요.</BoldText>

                                    <MBTISwitchContainer>
                                        <MBTISwitch
                                            label1="I"
                                            label2="E"
                                            isActive={mbti.IE.active}
                                            onToggle={() => toggleMBTI("IE")}
                                            percentage={mbti.IE.percentage}
                                            onPercentageChange={(e) => handlePercentageChange("IE", e.target.value)}
                                        />
                                        <MBTISwitch
                                            label1="S"
                                            label2="N"
                                            isActive={mbti.SN.active}
                                            onToggle={() => toggleMBTI("SN")}
                                            percentage={mbti.SN.percentage}
                                            onPercentageChange={(e) => handlePercentageChange("SN", e.target.value)}
                                        />
                                        <MBTISwitch
                                            label1="F"
                                            label2="T"
                                            isActive={mbti.FT.active}
                                            onToggle={() => toggleMBTI("FT")}
                                            percentage={mbti.FT.percentage}
                                            onPercentageChange={(e) => handlePercentageChange("FT", e.target.value)}
                                        />
                                        <MBTISwitch
                                            label1="P"
                                            label2="J"
                                            isActive={mbti.PJ.active}
                                            onToggle={() => toggleMBTI("PJ")}
                                            percentage={mbti.PJ.percentage}
                                            onPercentageChange={(e) => handlePercentageChange("PJ", e.target.value)}
                                        />
                                    </MBTISwitchContainer>


                                    <BoldText>아직 MBTI에 대해서 잘 모른다면?</BoldText>
                                    <p>글로플에서 제공하는 MBTI 테스트 하러 가기 ></p>

                                    <ButtonContainer>
                                        <BackButton onClick={goToFirstPage}>이전</BackButton>
                                        <NextButton onClick={goToThirdPage}>다음</NextButton>
                                    </ButtonContainer>
                                </motion.div>
                            </FormContainer>
                        )}
                        {step === 3 && (
                            <FormContainer>
                                <motion.div
                                    key="step3"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width: "100%"}}
                                >
                                    <BoldText>
                                        여행자들의 예약 대행을 돕는,<br/>
                                        글로플러로 활동하시겠어요?
                                    </BoldText>
                                    <BoldSubText>글로플러는 예약 대행자 분들을 지칭하는 글로플만의 명칭입니다.</BoldSubText>
                                    <div style={{margin: "30px 0"}}>
                                        <RadioButtonWrapper>
                                            <label>
                                                <RadioButton type="radio" name="glopler" />
                                                <RadioButtonComment>네! 글로플러로 활동 하겠습니다.</RadioButtonComment>
                                            </label>
                                        </RadioButtonWrapper>
                                        <RadioButtonWrapper>
                                            <RadioButton type="radio" name="glopler" />
                                            <RadioButtonComment>아니요, 예약만 진행할게요.</RadioButtonComment>
                                            <RadioButtonSubComment>나중에 변경할 수 있습니다.</RadioButtonSubComment>
                                        </RadioButtonWrapper>
                                    </div>

                                    <BoldText>글로플러 검증을 위한 파일을 첨부하여 제출해 주세요.</BoldText>


                                    <BoldSubText>
                                        주민등록증, 자격증, 여권 등을 첨부해 주시면, 글로플에서 서류를 검토하여 글로플러 리스트에 등록해 줘요.
                                    </BoldSubText>
                                    <div style={{margin: '30px 0'}}>
                                        <input type="file" onChange={handleFileChange}/>
                                    </div>


                                    <ButtonContainer>
                                        <BackButton onClick={goToSecondPage}>이전</BackButton>
                                        <NextButton onClick={goToFourthPage}>완료</NextButton>
                                    </ButtonContainer>
                                </motion.div>
                            </FormContainer>
                        )}

                        {step === 4 && (
                            <FormContainer>
                                <motion.div
                                    key="step4"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}
                                >
                                    <UserImg src="https://via.placeholder.com/100x100" />
                                    <FinishText>회원가입이 완료 되었습니다.</FinishText>
                                    <BoldSubText>글로플과 함께 특별하고 신뢰성 있는 여행을 떠나보아요!</BoldSubText>
                                    <GoToLoginPage onClick={onClickLogin}>
                                        로그인
                                    </GoToLoginPage>
                                </motion.div>
                            </FormContainer>
                        )}
                    </AnimatePresence>
                </ContentsWrapper>

            </Wrapper>
        </>

    );
}
