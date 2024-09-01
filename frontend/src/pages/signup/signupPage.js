import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wrapper,
    Logo,
    FormContainer,
    Progress,
    ProgressBar,
    GenderButtonWrapper,
    GenderButton,
    FormGroup,
    Input,
    ContentsWrapper,
    InputText,
    NextButtonWrapper,
    ButtonContainer,
    PageButton,
    BoldText,
    PercentageInput,
    MBTISwitchWrapper,
    SetCenter,
    RadioButton,
    RadioButtonComment,
    RadioButtonWrapper,
    RadioButtonSubComment,
    BoldSubText,
    UserImg,
    FinishText,
    GoToLoginPage,
    OverlayImageInput,
    GenderImage,
    LogoWrapper,
    FormLabel,
    FormField,
    SubComment,
    RadioForm,
    FileInput,
    Slider, MBTIButton, MBTIButtonWrapper,
} from "./signupStyle";
import {Switch as AntSwitch} from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {

    const [pw, setPw] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [nickName, setNickName] = useState("");
    const [glopler, setGlopler] = useState(false);
    const imgRef = useRef();
    const [imgFile, setImgFile] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [verificationFile, setVerificationFile] = useState(null);
    const [percentageIE, setPercentageIE] = useState(null);
    const [percentageSN, setPercentageSN] = useState(null);
    const [percentageFT, setPercentageFT] = useState(null);
    const [percentagePJ, setPercentagePJ] = useState(null);


    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [mbti, setMbti] = useState({
        IE: { active: false },
        SN: { active: false },
        FT: { active: false },
        PJ: { active: false },
    });

    const [IE, setIE] = useState("I");
    const [SN, setSN] = useState("S");
    const [FT, setFT] = useState("F");
    const [PJ, setPJ] = useState("P");

    const toggleMBTI = (key) => {
        setMbti((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                active: !prev[key].active,
            },
        }));
    };

    const goToFirstPage = () => {
        setStep(1);
    };
    const goToSecondPage = () => {
        console.log(id, pw, name, birthday, gender)
        setStep(2);
    };
    const goToThirdPage = () => {
        mbti.IE.active ? setIE("E") : setIE("I");
        mbti.SN.active ? setSN("N") : setSN("S");
        mbti.FT.active ? setFT("T") : setFT("F");
        mbti.PJ.active ? setPJ("J") : setPJ("P");

        setStep(3);
    };
    const goToFourthPage = () => {
        setStep(4);
    };

    const pageVariants = {
        initial: { x: "100%" },
        enter: { x: 0, transition: { duration: 0.5 } },
        exit: { x: "-100%", transition: { duration: 0.5 } },
    };

    const onClickSubmit = () => {

        if (glopler) {
            if (verificationFile == null) {
                alert("인증 파일을 첨부해 주세요.")
                return;
            }
        }

        const MBTI = IE + percentageIE + "/" + SN + percentageSN + "/" + FT + percentageFT + "/" + PJ + percentagePJ;
        console.log(MBTI)

        if (id && pw && name && birthday && gender && MBTI && nickName) {
            const formData = new FormData();
            formData.append('user', new Blob([JSON.stringify({
                userId: id,
                password: pw,
                name: name,
                dateOfBirth: birthday,
                gender: gender,
                mbti: MBTI,
                nickname: nickName,
                isAgent: glopler,
            })], { type: 'application/json' }));

            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            if (verificationFile) {
                formData.append('verificationFile', verificationFile);
            }

            console.log(id, pw, name, birthday, MBTI, nickName, glopler, profilePicture, verificationFile)

            axios.post('http://localhost:8080/api/users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                    setStep(5);
                })
                .catch(error => {
                    console.error(error);
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                });
        } else {
            alert("모든 정보를 올바르게 기입해 주세요.");
        }
    };

    const MBTISwitch = ({ label1, label2, isActive, onToggle }) => {
        return (
            <MBTISwitchWrapper>
                <div>
                    <SetCenter>
                        {label1}&nbsp;&nbsp;{label2}
                    </SetCenter>
                    <AntSwitch checked={isActive} onChange={onToggle} style={{ marginLeft: 10, marginRight: 10, backgroundColor:"lightgray" }} />

                </div>
            </MBTISwitchWrapper>
        );
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
        saveImgFile(event);
    };

    const handleVerificationFileChange = (event) => {
        setVerificationFile(event.target.files[0]);
    };

    const saveImgFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };

    const onClickLogin = () => {
        navigate('/login');
    }

    const onChangeId = (event) => {
        setId(event.target.value)
    }
    const onChangePw = (event) => {
        setPw(event.target.value)
    }
    const onChangeName = (event) => {
        setName(event.target.value)
    }
    const onChangeBirthday = (event) => {
        setBirthday(event.target.value)
    }
    const onClickMan = () => {
        setGender("M");
    }
    const onClickWoman = () => {
        setGender("W");
    }
    const onChangeNickName = (event) => {
        setNickName(event.target.value)
    }
    const onClickGlopler = (isGlopler) => {
        setGlopler(isGlopler);
    }
    const onChangePercentageIE = (event) => {
        setPercentageIE(event.target.value)
    };
    const onChangePercentageSN = (event) => {
        setPercentageSN(event.target.value)
    };
    const onChangePercentageFT = (event) => {
        setPercentageFT(event.target.value)
    };
    const onChangePercentagePJ = (event) => {
        setPercentagePJ(event.target.value)
    };
    const [value, setValue] = useState(50); // 슬라이더의 초기 값을 설정합니다.

    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value, 10); // 값을 정수로 변환
        setValue(newValue);
    };
    const [selectedIE, setSelectedIE] = useState('E');
    const [selectedSN, setSelectedSN] = useState('S');
    const [selectedFT, setSelectedFT] = useState('F');
    const [selectedPJ, setSelectedPJ] = useState('P');

    const handleIEClick = (value) => {
        setSelectedIE(value);
    };

    const handleSNClick = (value) => {
        setSelectedSN(value);
    };

    const handleFTClick = (value) => {
        setSelectedFT(value);
    };

    const handlePJClick = (value) => {
        setSelectedPJ(value);
    };

    return (
        <>
            <Wrapper>

                <LogoWrapper>
                    <Logo src='/Img/Logo2.png'></Logo>
                </LogoWrapper>
                <ContentsWrapper>
                    <ProgressBar>
                        <Progress style={{ marginLeft: step === 1 ? "0" : step === 2 ? "20%" : step === 3 ? "40%" : step === 4 ? "60%" : "80%" }}></Progress>
                    </ProgressBar>
                    <AnimatePresence>
                        {step === 1 && (
                            <FormContainer>
                                <motion.div
                                    key="step1"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width: "100%"}}
                                >
                                    <BoldText>회원가입</BoldText>
                                    <BoldSubText>글로플의 회원이 되어 색다른 여행을 경험해 보세요.</BoldSubText>

                                    <FormGroup>
                                        <FormField type="input" onChange={onChangeId} placeholder="아이디" required="" />
                                        <FormLabel for="ID">아이디</FormLabel>
                                        <SubComment>6~20자</SubComment>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormField type="password" onChange={onChangePw} placeholder="비밀번호" required="" />
                                        <FormLabel for="PW">비밀번호</FormLabel>
                                        <SubComment>문자, 숫자 포함 8~20자</SubComment>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormField type="input" onChange={onChangeName} placeholder="이름" required="" />
                                        <FormLabel for="Name">이름</FormLabel>
                                        <SubComment>이름을 입력해주세요.</SubComment>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormField type="input" onChange={onChangeBirthday} placeholder="생년월일" required="" />
                                        <FormLabel for="Birthday">생년월일</FormLabel>
                                        <SubComment>ex)020331</SubComment>
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
                        )}
                        {step === 2 && (
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
                                    <div>
                                        <Slider
                                            id="myRange"
                                            className="slider"
                                            value={value}
                                            max="100"
                                            min="0"
                                            step="1" // 정수만 허용
                                            onChange={handleChange}
                                            type="range"
                                        />
                                        <p>Value: {value}</p> {/* 슬라이더의 현재 값을 정수로 표시 */}
                                    </div>

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

                                    {/*<MBTISwitchContainer>*/}


                                    {/*    <MBTISwitch*/}
                                    {/*        label1="I"*/}
                                    {/*        label2="E"*/}
                                    {/*        isActive={mbti.IE.active}*/}
                                    {/*        onToggle={() => toggleMBTI("IE")}*/}
                                    {/*    />*/}
                                    {/*    <PercentageInput*/}
                                    {/*        type="text"*/}
                                    {/*        onChange={onChangePercentageIE}*/}
                                    {/*        placeholder="%"*/}
                                    {/*    />*/}
                                    {/*    <MBTISwitch*/}
                                    {/*        label1="S"*/}
                                    {/*        label2="N"*/}
                                    {/*        isActive={mbti.SN.active}*/}
                                    {/*        onToggle={() => toggleMBTI("SN")}*/}
                                    {/*    />*/}
                                    {/*    <PercentageInput*/}
                                    {/*        type="text"*/}
                                    {/*        onChange={onChangePercentageSN}*/}
                                    {/*        placeholder="%"*/}
                                    {/*    />*/}
                                    {/*    <MBTISwitch*/}
                                    {/*        label1="F"*/}
                                    {/*        label2="T"*/}
                                    {/*        isActive={mbti.FT.active}*/}
                                    {/*        onToggle={() => toggleMBTI("FT")}*/}
                                    {/*    />*/}
                                    {/*    <PercentageInput*/}
                                    {/*        type="text"*/}
                                    {/*        onChange={onChangePercentageFT}*/}
                                    {/*        placeholder="%"*/}
                                    {/*    />*/}
                                    {/*    <MBTISwitch*/}
                                    {/*        label1="P"*/}
                                    {/*        label2="J"*/}
                                    {/*        isActive={mbti.PJ.active}*/}
                                    {/*        onToggle={() => toggleMBTI("PJ")}*/}
                                    {/*    />*/}
                                    {/*    <PercentageInput*/}
                                    {/*        type="text"*/}
                                    {/*        onChange={onChangePercentagePJ}*/}
                                    {/*        placeholder="%"*/}
                                    {/*    />*/}
                                    {/*</MBTISwitchContainer>*/}


                                    <BoldText>아직 MBTI에 대해서 잘 모른다면?</BoldText>
                                    <p>글로플에서 제공하는 MBTI 테스트 하러 가기 ></p>
                                    <br/><br/><br/><br/>

                                    <ButtonContainer>
                                        <PageButton onClick={goToFirstPage}>이전</PageButton>
                                        <PageButton onClick={goToThirdPage}>다음</PageButton>
                                    </ButtonContainer>
                                </motion.div>
                            </FormContainer>
                        )}
                        {step === 3 && (
                            <FormContainer>
                                <motion.div
                                    key="step3"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width: "100%"}}
                                >
                                    <BoldText>프로필을 설정해 주세요.</BoldText>
                                    <label>
                                        <UserImg src={imgFile ? imgFile : '/Img/signInImg/firstProfileImg.png'}/>
                                        <OverlayImageInput type="file" accept="image/*"
                                                           onChange={handleProfilePictureChange} ref={imgRef}/>
                                    </label>
                                    <br/>
                                    <FormGroup>
                                        <InputText>닉네임</InputText>
                                        <Input type="text" maxlength={20} size="50" placeholder="닉네임을 입력해 주세요. (1~8자)"
                                               onChange={onChangeNickName}/>
                                    </FormGroup>
                                    <br/><br/>
                                    <ButtonContainer>
                                        <PageButton onClick={goToSecondPage}>이전</PageButton>
                                        <PageButton onClick={goToFourthPage}>다음</PageButton>
                                    </ButtonContainer>
                                </motion.div>
                            </FormContainer>
                        )}
                        {step === 4 && (
                            <FormContainer>
                                <motion.div
                                    key="step4"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width: "100%"}}
                                >
                                    <BoldText>
                                        여행자들의 예약 대행을 돕는,<br/>
                                        글로플러로 활동하시겠어요?
                                    </BoldText>
                                    <BoldSubText>글로플러는 예약 대행자 분들을 지칭하는 글로플만의 명칭입니다.</BoldSubText>
                                    <div style={{margin: "0 0 80px"}}>
                                        <RadioForm>
                                            <input value="a" name="glopler" type="radio" id="a"
                                                   onClick={() => onClickGlopler(true)}/>
                                            <label htmlFor="a"><span></span>네! 글로플러로 활동 하겠습니다.</label>
                                            <input defaultChecked value="b" name="glopler" type="radio" id="b"/>
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
                                    <div style={{margin: '30px 0'}}>
                                        <FileInput type="file" onChange={handleVerificationFileChange}/>
                                    </div>


                                    <ButtonContainer>
                                        <PageButton onClick={goToThirdPage}>이전</PageButton>
                                        <PageButton onClick={onClickSubmit}>완료</PageButton>
                                    </ButtonContainer>
                                </motion.div>
                            </FormContainer>
                        )}

                        {step === 5 && (
                            <FormContainer>
                                <motion.div
                                    key="step5"
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={pageVariants}
                                    style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}
                                >
                                    <UserImg src={imgFile ? imgFile :"https://via.placeholder.com/100x100"} />
                                    <FinishText>회원가입이 완료 되었습니다.</FinishText>
                                    <BoldSubText>글로플과 함께 특별하고 신뢰성 있는 여행을 떠나보아요!</BoldSubText>
                                    <GoToLoginPage onClick={onClickLogin}>
                                        로그인
                                    </GoToLoginPage>
                                </motion.div>
                            </FormContainer>
                        )}
                    </AnimatePresence>
                </ContentsWrapper>

            </Wrapper>
        </>
    );
}
