import {
    BoldText, ButtonContainer,
    FormContainer,
    MBTIButton, MBTIButtonWrapper, PageButton, PercentValueWrapper, Slider, SliderWrapper,
} from "../signupStyle";
import {motion} from "framer-motion";
import React from "react";
import {useNavigate} from "react-router-dom";

const MBTIForm = ({
                      IE,
                      SN,
                      FT,
                      PJ,
                      percentValue,
                      handleIEClick,
                      handleSNClick,
                      handleFTClick,
                      handlePJClick,
                      handleChange,
                      goToFirstPage,
                      goToThirdPage,
                      pageVariants,
                      onClickMBTItest
                  }) => {
    const navigate = useNavigate();

    return (
        <FormContainer>
            <motion.div
                key="step2"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{width: "100%"}}
            >

                <BoldText>MBTI를 알려주세요.</BoldText>


                <MBTIButtonWrapper>

                    <MBTIButton
                        selected={IE === 'I'}
                        onClick={() => handleIEClick('I')}
                    >
                        I
                    </MBTIButton>
                    <MBTIButton
                        selected={IE === 'E'}
                        onClick={() => handleIEClick('E')}
                    >
                        E
                    </MBTIButton>
                </MBTIButtonWrapper>
                <MBTIButtonWrapper>
                    <MBTIButton
                        selected={SN === 'S'}
                        onClick={() => handleSNClick('S')}
                    >
                        S
                    </MBTIButton>
                    <MBTIButton
                        selected={SN === 'N'}
                        onClick={() => handleSNClick('N')}
                    >
                        N
                    </MBTIButton>
                </MBTIButtonWrapper>
                <MBTIButtonWrapper>
                    <MBTIButton
                        selected={FT === 'F'}
                        onClick={() => handleFTClick('F')}
                    >
                        F
                    </MBTIButton>
                    <MBTIButton
                        selected={FT === 'T'}
                        onClick={() => handleFTClick('T')}
                    >
                        T
                    </MBTIButton>
                </MBTIButtonWrapper>
                <MBTIButtonWrapper>
                    <MBTIButton
                        selected={PJ === 'P'}
                        onClick={() => handlePJClick('P')}
                    >
                        P
                    </MBTIButton>
                    <MBTIButton
                        selected={PJ === 'J'}
                        onClick={() => handlePJClick('J')}
                    >
                        J
                    </MBTIButton>
                </MBTIButtonWrapper>
                <SliderWrapper>
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="51"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[0]}
                        onChange={handleChange(0)}
                    />
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="51"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[1]}
                        onChange={handleChange(1)}
                    />
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="51"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[2]}
                        onChange={handleChange(2)}
                    />
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="51"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[3]}
                        onChange={handleChange(3)}
                    />
                </SliderWrapper>
                <SliderWrapper>
                    <PercentValueWrapper>
                        {percentValue[0]}%
                    </PercentValueWrapper>
                    <PercentValueWrapper>
                        {percentValue[1]}%
                    </PercentValueWrapper>
                    <PercentValueWrapper>
                        {percentValue[2]}%
                    </PercentValueWrapper>
                    <PercentValueWrapper>
                        {percentValue[3]}%
                    </PercentValueWrapper>
                </SliderWrapper>

                <div style={{height:'30px'}}></div>
                <BoldText>아직 MBTI에 대해서 잘 모른다면?</BoldText>
                <p style={{cursor: "pointer"}} onClick={onClickMBTItest}>글로플에서 제공하는 MBTI 테스트 하러 가기 ></p>
                <br/><br/><br/><br/>

                <ButtonContainer>
                    <PageButton onClick={goToFirstPage}>이전</PageButton>
                    <PageButton onClick={goToThirdPage}>다음</PageButton>
                </ButtonContainer>
            </motion.div>
        </FormContainer>
    );
};

export default MBTIForm;