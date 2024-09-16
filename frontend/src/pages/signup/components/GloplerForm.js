import React from 'react';
import { motion } from 'framer-motion';
import {
    BoldSubText,
    BoldText,
    ButtonContainer,
    FileInput,
    FormContainer, PageButton,
    RadioButtonSubComment,
    RadioForm
} from "../signupStyle";

// glopler 적용했으나 false로 저장됨

const GloplerForm = ({
                         pageVariants,
                         onClickGlopler,
                         handleVerificationFileChange,
                         goToThirdPage,
                         onClickSubmit,
                     }) => {
    return (
        <FormContainer>
            <motion.div
                key="step4"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{ width: "100%" }}
            >
                <BoldText>
                    여행자들의 예약 대행을 돕는,<br />
                    글로플러로 활동하시겠어요?
                </BoldText>
                <BoldSubText>글로플러는 예약 대행자 분들을 지칭하는 글로플만의 명칭입니다.</BoldSubText>
                <div style={{ margin: "0 0 80px" }}>
                    <RadioForm>
                        <input value="a" name="glopler" type="radio" id="a" onClick={() => onClickGlopler(true)} />
                        <label htmlFor="a"><span></span>네! 글로플러로 활동 하겠습니다.</label>
                        <input defaultChecked value="b" name="glopler" type="radio" id="b" />
                        <label htmlFor="b"><span></span>아니요, 예약만 진행할게요.</label>
                        <div className="worm">
                            <div className="worm__segment"></div>
                        </div>
                    </RadioForm>
                    <RadioButtonSubComment>나중에 변경할 수 있습니다.</RadioButtonSubComment>
                </div>

                <BoldText>글로플러 검증을 위한 파일을 첨부하여 제출해 주세요.</BoldText>

                <BoldSubText>
                    주민등록증, 자격증, 여권 등을 첨부해 주시면, 글로플에서 서류를 검토하여 글로플러 리스트에 등록해 줘요.
                </BoldSubText>
                <div style={{ margin: '30px 0' }}>
                    <FileInput type="file" onChange={handleVerificationFileChange} />
                </div>

                <ButtonContainer>
                    <PageButton onClick={goToThirdPage}>이전</PageButton>
                    <PageButton onClick={onClickSubmit}>완료</PageButton>
                </ButtonContainer>
            </motion.div>
        </FormContainer>
    );
};

export default GloplerForm;
