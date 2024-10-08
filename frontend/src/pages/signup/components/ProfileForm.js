import React from 'react';
import { motion } from 'framer-motion';
import {
    BoldText,
    ButtonContainer,
    FormContainer,
    FormGroup,
    InputText,
    OverlayImageInput, PageButton,
    UserImg
} from "../signupStyle";
import {Input} from "antd";
const ProfileForm = ({
                         imgFile,
                         handleProfilePictureChange,
                         imgRef,
                         nickName,
                         onChangeNickName,
                         goToSecondPage,
                         goToFourthPage,
                         pageVariants,
                     }) => {
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
                <label>
                    <UserImg src={imgFile ? imgFile : '/Img/signInImg/firstProfileImg.png'} />
                    <OverlayImageInput
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        ref={imgRef}
                    />
                </label>
                <br />
                <FormGroup>
                    <InputText>닉네임</InputText>
                    <Input
                        value={nickName}
                        type="text"
                        maxLength={20}
                        size="50"
                        placeholder="닉네임을 입력해 주세요. (1~8자)"
                        onChange={onChangeNickName}
                    />
                </FormGroup>
                <br /><br />
                <ButtonContainer>
                    <PageButton onClick={goToSecondPage}>이전</PageButton>
                    <PageButton onClick={goToFourthPage}>다음</PageButton>
                </ButtonContainer>
            </motion.div>
        </FormContainer>
    );
};

export default ProfileForm;
