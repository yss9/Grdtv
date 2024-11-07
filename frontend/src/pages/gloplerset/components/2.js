import {
    BoldText, ButtonContainer, Dropdown,
    FormContainer,
    PageButton, BoldSubText, FileInput, Letknow, BoldText2
} from "../gloplesetStyle";
import {motion} from "framer-motion";
import React, { useState } from "react";
import Gloglo from '../../../images/GlopleCharacter.png'
import {GlopleCharacterImg} from "../../recomendation/MBTI/mbtistyle";

const Second = ({
                    selectedCountry,
                    handleVerificationFileChange,
                    handleCountryChange,
                    goToFirstPage,
                    goToThirdPage,
                    pageVariants,
                }) => {

    const [verificationFile, setVerificationFile] = useState(null);

    // 파일이 변경될 때 상태 업데이트
    const handleFileChange = (event) => {
        setVerificationFile(event.target.files[0]);  // 파일 선택 시 상태 업데이트
        if (handleVerificationFileChange) {
            handleVerificationFileChange(event);  // 부모 컴포넌트로 파일 변경 핸들링
        }
    };

    const handleNextPage = () => {
        if (!selectedCountry) {
            alert("나라를 선택해야 합니다.");
        } else if (!verificationFile) {
            alert("글로플러 검증 파일을 첨부해야 합니다.");
        } else {
            goToThirdPage();  // 파일이 있으면 다음 페이지로 이동
        }
    };

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
                <BoldText>글로플러로 활동할 나라를 선택해주세요.</BoldText>
                <Dropdown value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select a country</option>
                    <optgroup label="America">
                        <option value="미국">미국</option>
                    </optgroup>
                    <optgroup label="Europe">
                        <option value="이탈리아">이탈리아</option>
                    </optgroup>
                    <optgroup label="Asia">
                        <option value="일본">일본</option>
                    </optgroup>
                </Dropdown>
                {selectedCountry && (
                    <>
                        <Letknow>
                            <GlopleCharacterImg src={Gloglo}/>
                            <BoldText2>
                                <p>{selectedCountry}</p>의 글로플러로 활동
                            </BoldText2>
                        </Letknow>
                        <div style={{margin: '120px 0'}}></div>

                        <BoldText>글로플러 검증을 위한 파일을 첨부하여 제출해 주세요.</BoldText>

                        <BoldSubText>
                            주민등록증, 자격증, 여권 등을 첨부해 주시면, 글로플에서 서류를 검토하여 글로플러 리스트에 등록해 줘요.
                        </BoldSubText>
                        <div style={{margin: '30px 0'}}>
                            <FileInput type="file" onChange={handleFileChange}/>
                        </div>

                    </>
                )}

                <ButtonContainer>
                    <PageButton onClick={goToFirstPage}>이전</PageButton>
                    <PageButton onClick={handleNextPage}>다음</PageButton>
                </ButtonContainer>
            </motion.div>
        </FormContainer>
    );
};

export default Second;
