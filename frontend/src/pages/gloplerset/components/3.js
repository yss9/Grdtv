import React from 'react';
import { motion } from 'framer-motion';
import Agentprofileset from '../../../components/Agent/agentprofileset';
import {
    BoldText,
    ButtonContainer,
    FormContainer,
    PageButton,
} from "../gloplesetStyle";

const Third = ({
                   onClickSubmit,
                   goToSecondPage,
                   goToFourthPage,
                   name,
                   setName,
                   hashtags,
                   setHashtags,
                   specs,
                   setSpecs,
                   pageVariants,
               }) => {
    const handleNext = () => {
        onClickSubmit();
        goToFourthPage();
    };
    return (
        <FormContainer>
            <motion.div
                key="step3"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{ width: "100%" }}
            >
                <BoldText>프로필을 설정해 주세요.</BoldText>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Agentprofileset
                        name={name}
                        setName={setName}
                        hashtags={hashtags}
                        setHashtags={setHashtags}
                        specs={specs}
                        setSpecs={setSpecs}
                    />
                </div>
                <ButtonContainer>
                    <PageButton onClick={goToSecondPage}>이전</PageButton>
                    <PageButton onClick={handleNext}>다음</PageButton>
                </ButtonContainer>
            </motion.div>
        </FormContainer>
    );
};

export default Third;
