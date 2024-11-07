import React from 'react';
import { motion } from 'framer-motion';
import {BoldSubText, FinishText, FormContainer, GoToLoginPage, UserImg} from "../gloplesetStyle";

const SignUpComplete = ({ imgFile, onClickMy, pageVariants }) => {
    return (
        <FormContainer>
            <motion.div
                key="step4"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M133.333 40L59.9998 113.333L26.6665 80" stroke="#4353ed" strokeWidth="8"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <FinishText>글로플러 신청이 완료 되었습니다.</FinishText>
                <BoldSubText>글로플과 함께 특별하고 믿을 수 있는 여행을 만들어보아요!</BoldSubText>
                <GoToLoginPage onClick={onClickMy}>
                    확인
                </GoToLoginPage>
            </motion.div>
        </FormContainer>
    );
};

export default SignUpComplete;
