import React, { useState } from 'react';
import { Reset } from "styled-reset";
import { motion } from 'framer-motion';
import {
    BoldSubText,
    BoldText,
    FormContainer,
    NextButtonWrapper, PageButton,
} from "../gloplesetStyle";
import { RadioForm } from "../gloplesetStyle";

const First = ({
                   onClickGlopler,
                   goToSecondPage,
                   pageVariants
               }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onClickGlopler(!isChecked);
    };

    const handleNextClick = () => {
        if (isChecked) {
            goToSecondPage();
        } else {
            alert("체크박스를 선택해주세요.");
        }
    };

    return (
        <>
            <Reset/>
            <FormContainer>
                <motion.div
                    key="step1"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={pageVariants}
                    style={{width: "100%"}}
                >
                    <BoldText>글로플러 신청</BoldText>
                    <BoldSubText>글로플러가 되어 색다른 여행을 선사해 주세요.</BoldSubText>

                    <BoldText>여행자들의 예약 대행을 돕는, <p>글로플러</p>로 활동하시겠어요?</BoldText>
                    <div style={{marginTop: '20px'}}></div>
                    <BoldText><p>글로플러</p>로 활동하기 위해서는 양심적인 태도를 가지고 임해야 합니다.</BoldText>
                    <BoldText>부정행위가 발견될 경우, 이에 따른 불이익이 있을 수 있으니, 항상 정직하게 참여해 주시기 바랍니다.</BoldText>
                    <div style={{marginTop: '30px'}}></div>
                    <BoldSubText>글로플러는 예약 대행자 분들을 지칭하는 글로플만의 명칭입니다.</BoldSubText>
                    <div style={{marginTop: "100px"}}>
                        <RadioForm>
                            <input
                                type="checkbox"
                                id="gloplerCheckbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                style={{fontFamily:'Regular'}}
                            />
                            네! 글로플러로 활동 하겠습니다.
                        </RadioForm>
                    </div>
                    <NextButtonWrapper>
                        <PageButton onClick={handleNextClick} disabled={!isChecked}>다음</PageButton>
                    </NextButtonWrapper>
                </motion.div>
            </FormContainer>
        </>
    );
};

export default First;
