import React from 'react';
import { motion } from 'framer-motion';
import {
    BoldSubText,
    BoldText, ErrorMessage,
    FormContainer,
    FormField,
    FormGroup,
    FormLabel, GenderButton, GenderButtonWrapper, GenderImage,
    InputText, NextButtonWrapper, PageButton,
    SubComment
} from "../signupStyle";

const UserInfoForm = ({
                        id,
                        pw,
                        name,
                        birthday,
                        gender,
                        onChangeId,
                        onChangePw,
                        onChangeName,
                        onChangeBirthday,
                        onClickWoman,
                        onClickMan,
                        goToSecondPage,
                        pageVariants,
                        idError,
                        pwError,
                        nameError,
                        birthdayError
                    }) => {
    return (
        <FormContainer>
            <motion.div
                key="step1"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{ width: "100%" }}
            >
                <BoldText>회원가입</BoldText>
                <BoldSubText>글로플의 회원이 되어 색다른 여행을 경험해 보세요.</BoldSubText>

                <FormGroup>
                    <FormField value={id} type="input" onChange={onChangeId} placeholder="아이디" required />
                    <FormLabel htmlFor="ID">아이디</FormLabel>
                    <SubComment>{idError && <ErrorMessage>{idError}</ErrorMessage>}
                        6~20자</SubComment>

                </FormGroup>
                <FormGroup>
                    <FormField value={pw} type="password" onChange={onChangePw} placeholder="비밀번호" required />
                    <FormLabel htmlFor="PW">비밀번호</FormLabel>
                    <SubComment>{pwError && <ErrorMessage>{pwError}</ErrorMessage>}
                        문자, 숫자 포함 8~20자</SubComment>

                </FormGroup>
                <FormGroup>
                    <FormField value={name} type="input" onChange={onChangeName} placeholder="이름" required />
                    <FormLabel htmlFor="Name">이름</FormLabel>
                    <SubComment>{nameError && <ErrorMessage>{nameError}</ErrorMessage>}
                        이름을 입력해주세요.</SubComment>

                </FormGroup>
                <FormGroup>
                    <FormField value={birthday} type="input" onChange={onChangeBirthday} placeholder="생년월일" required />
                    <FormLabel htmlFor="Birthday">생년월일</FormLabel>
                    <SubComment>{birthdayError && <ErrorMessage>{birthdayError}</ErrorMessage>}
                        ex)20020331</SubComment>

                </FormGroup>
                <FormGroup>
                    <InputText>Gender</InputText>
                    <GenderButtonWrapper>
                        <GenderButton onClick={onClickWoman}>
                            <GenderImage
                                src={gender === 'W' ? '/Img/signInImg/womanOn.png' : '/Img/signInImg/womanOff.png'}
                                alt="Gender Icon"
                            />
                        </GenderButton>
                        <GenderButton onClick={onClickMan}>
                            <GenderImage
                                src={gender === 'M' ? '/Img/signInImg/manOn.png' : '/Img/signInImg/manOff.png'}
                                alt="Gender Icon"
                            />
                        </GenderButton>
                    </GenderButtonWrapper>
                </FormGroup>
                <NextButtonWrapper>
                    <PageButton onClick={goToSecondPage}>다음</PageButton>
                </NextButtonWrapper>
            </motion.div>
        </FormContainer>
    );
};

export default UserInfoForm;
