import React from 'react';
import { motion } from 'framer-motion';
import {BoldSubText, FinishText, FormContainer, GoToLoginPage, UserImg} from "../signupStyle";

const SignUpComplete = ({ imgFile, onClickLogin, pageVariants }) => {
    return (
        <FormContainer>
            <motion.div
                key="step5"
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
                <UserImg src={imgFile ? imgFile : "https://via.placeholder.com/100x100"} />
                <FinishText>회원가입이 완료 되었습니다.</FinishText>
                <BoldSubText>글로플과 함께 특별하고 믿을 수 있는 여행을 떠나보아요!</BoldSubText>
                <GoToLoginPage onClick={onClickLogin}>
                    로그인
                </GoToLoginPage>
            </motion.div>
        </FormContainer>
    );
};

export default SignUpComplete;
