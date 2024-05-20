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
    Input, Switch,
    ContentsWrapper,
    InputText,
    NextButtonWrapper,
    MBTIContainer,
    MBTIWrapper,
    MBTISwitch, InterestContainer, InterestButton, ButtonContainer, BackButton, MBTISwitchWrapper, Handle, BoldText
} from "./signInStyle";
// import {Switch} from "antd";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [isActive, setIsActive] = useState(true);
    

    const handleNext = () => {
        setStep(2);
    };
    const handleBack = () => {
        setStep(1);
    };

    const pageVariants = {
        initial: { x: "100%" },
        enter: { x: 0, transition: { duration: 0.5 } },
        exit: { x: "-100%", transition: { duration: 0.5 } },
    };

    const [MBTI, setMBTI] = useState([false, false, false, false]);


    const toggleSwitch = (index) => {
        setMBTI[index](!MBTI[index]);
        setIsActive(!isActive);
        console.log(MBTI[index])
    };


    return (
        <>
            <Wrapper>
                <Logo>LOGO</Logo>
                <ContentsWrapper>
                    <ProgressBar>
                        <Progress style={{ marginLeft: step === 1 ? "0" : "25%" }}></Progress>
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
                                        <NextButton onClick={handleNext}>다음</NextButton>
                                    </NextButtonWrapper>
                                </motion.div>
                            </FormContainer>

                        )}
                        {step === 2 && (
                            <FormContainer>
                                <motion.div
                                    key="step1"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width:"100%"}}
                                >
                                    <BoldText>MBTI를 알려주세요.</BoldText>
                                    {/*<MBTIContainer>*/}
                                    {/*    <MBTIWrapper>*/}
                                    {/*        <MBTISwitch index={0} type="checkbox" />*/}
                                    {/*    </MBTIWrapper>*/}
                                    {/*    <MBTIWrapper>*/}
                                    {/*        <MBTISwitch index={1} type="checkbox" />*/}
                                    {/*    </MBTIWrapper>*/}
                                    {/*    <MBTIWrapper>*/}
                                    {/*        <MBTISwitch index={2} type="checkbox" />*/}
                                    {/*    </MBTIWrapper>*/}
                                    {/*    <MBTIWrapper>*/}
                                    {/*        <MBTISwitch index={3} type="checkbox" />*/}
                                    {/*    </MBTIWrapper>*/}
                                    {/*</MBTIContainer>*/}

                                    <MBTIWrapper>
                                        <MBTISwitchWrapper onClick={toggleSwitch}>
                                            <Switch isActive={isActive} active={MBTI[0]} style={MBTI[0] ? {backgroundColor: "pink"} : {backgroundColor: "skyblue"}}>
                                                <Handle layout transition={{type: 'spring', stiffness: 700, damping: 30}}/>
                                            </Switch>
                                        </MBTISwitchWrapper>
                                    </MBTIWrapper>


                                    <BoldText>관심사를 알려주세요.</BoldText>
                                    <InterestContainer>
                                        <InterestButton>관심사1</InterestButton>
                                        <InterestButton>관심사2</InterestButton>
                                        <InterestButton>관심사3</InterestButton>
                                        <InterestButton>관심사4</InterestButton>
                                        <InterestButton>관심사5</InterestButton>
                                        <InterestButton>관심사6</InterestButton>
                                        <InterestButton>관심사7</InterestButton>
                                        <InterestButton>관심사8</InterestButton>
                                        <InterestButton>관심사9</InterestButton>
                                        <InterestButton>관심사10</InterestButton>
                                    </InterestContainer>
                                    <ButtonContainer>
                                        <BackButton onClick={handleBack}>이전</BackButton>
                                        <NextButton onClick={handleNext}>다음</NextButton>
                                    </ButtonContainer>
                                </motion.div>
                            </FormContainer>
                        )}
                    </AnimatePresence>
                </ContentsWrapper>

            </Wrapper>
        </>

    );
}
