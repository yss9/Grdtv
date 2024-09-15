import {
    BoldText, ButtonContainer,
    FormContainer,
    MBTIButton, MBTIButtonWrapper, PageButton, PercentValueWrapper, Slider, SliderWrapper,
} from "../signupStyle";
import {motion} from "framer-motion";
import React from "react";

const MBTIForm = ({
                      selectedIE,
                      selectedSN,
                      selectedFT,
                      selectedPJ,
                      percentValue,
                      handleIEClick,
                      handleSNClick,
                      handleFTClick,
                      handlePJClick,
                      handleChange,
                      goToFirstPage,
                      goToThirdPage,
                      pageVariants,
                  }) => {
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
                        selected={selectedIE === 'E'}
                        onClick={() => handleIEClick('E')}
                    >
                        E
                    </MBTIButton>
                    <MBTIButton
                        selected={selectedIE === 'I'}
                        onClick={() => handleIEClick('I')}
                    >
                        I
                    </MBTIButton>
                </MBTIButtonWrapper>
                <MBTIButtonWrapper>
                    <MBTIButton
                        selected={selectedSN === 'S'}
                        onClick={() => handleSNClick('S')}
                    >
                        S
                    </MBTIButton>
                    <MBTIButton
                        selected={selectedSN === 'N'}
                        onClick={() => handleSNClick('N')}
                    >
                        N
                    </MBTIButton>
                </MBTIButtonWrapper>
                <MBTIButtonWrapper>
                    <MBTIButton
                        selected={selectedFT === 'F'}
                        onClick={() => handleFTClick('F')}
                    >
                        F
                    </MBTIButton>
                    <MBTIButton
                        selected={selectedFT === 'T'}
                        onClick={() => handleFTClick('T')}
                    >
                        T
                    </MBTIButton>
                </MBTIButtonWrapper>
                <MBTIButtonWrapper>
                    <MBTIButton
                        selected={selectedPJ === 'P'}
                        onClick={() => handlePJClick('P')}
                    >
                        P
                    </MBTIButton>
                    <MBTIButton
                        selected={selectedPJ === 'J'}
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
                        min="50"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[0]}
                        onChange={handleChange(0)}
                    />
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="50"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[1]}
                        onChange={handleChange(1)}
                    />
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="50"
                        step="1" // 정수만 허용
                        type="range"
                        value={percentValue[2]}
                        onChange={handleChange(2)}
                    />
                    <Slider
                        id="myRange"
                        className="slider"
                        max="100"
                        min="50"
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
                <p>글로플에서 제공하는 MBTI 테스트 하러 가기 ></p>
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