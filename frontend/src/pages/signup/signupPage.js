import React, {useEffect, useRef, useState} from "react";
import { AnimatePresence } from "framer-motion";
import {
    Wrapper,
    Logo,
    Progress,
    ProgressBar,
    ContentsWrapper,
    LogoWrapper,
} from "./signupStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfoForm from "./components/UserInfoForm";
import MBTIForm from "./components/MBTIForm";
import ProfileForm from "./components/ProfileForm";
import GloplerForm from "./components/GloplerForm";
import SignUpComplete from "./components/SignUpComplete";

export default function SignupPage() {

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [nickName, setNickName] = useState("");
    const imgRef = useRef();
    const [imgFile, setImgFile] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [percentageIE, setPercentageIE] = useState(null);
    const [percentageSN, setPercentageSN] = useState(null);
    const [percentageFT, setPercentageFT] = useState(null);
    const [percentagePJ, setPercentagePJ] = useState(null);
    const [step, setStep] = useState(1);
    const [IE, setIE] = useState("I");
    const [SN, setSN] = useState("S");
    const [FT, setFT] = useState("F");
    const [PJ, setPJ] = useState("P");
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const [nameError, setNameError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');

    const goToFirstPage = () => {
        setStep(1);
    };
    const goToSecondPage = () => {
        if (!idError && !pwError && !nameError && !birthdayError){
            const signupData = {
                id,
                pw,
                name,
                birthday,
                gender,
                nickName,
                profilePicture,
            };
            localStorage.setItem('signupData', JSON.stringify(signupData));
            console.log(signupData)
            setStep(2);
        }
    };
    const goToThirdPage = () => {

        setPercentageIE(percentValue[0])
        setPercentageSN(percentValue[1])
        setPercentageFT(percentValue[2])
        setPercentagePJ(percentValue[3])
        console.log(IE, percentageIE, SN, percentageSN, FT, percentageFT, PJ, percentagePJ )

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

        const MBTI = IE + percentageIE + "/" + SN + percentageSN + "/" + FT + percentageFT + "/" + PJ + percentagePJ;
        console.log(MBTI)

        if (id && pw && name && birthday && gender && MBTI && nickName && profilePicture) {
            const formData = new FormData();
            formData.append('user', new Blob([JSON.stringify({
                userId: id,
                password: pw,
                name: name,
                dateOfBirth: birthday,
                gender: gender,
                mbti: MBTI,
                nickname: nickName,
            })], { type: 'application/json' }));

            formData.append('profilePicture', profilePicture);

            console.log(id, pw, name, birthday, MBTI, nickName, profilePicture)

            axios.post('http://localhost:8080/api/users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                    setStep(4);
                })
                .catch(error => {
                    console.error(error);
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                });
        } else {
            alert("모든 정보를 올바르게 기입해 주세요.");
        }
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
        saveImgFile(event);
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

    const onChangeId = (e) => {
        const value = e.target.value;
        setId(value);
        if (value.length < 6 || value.length > 20) {
            setIdError('아이디는 6~20자 사이여야 합니다.');
        } else {
            setIdError('');
        }
    }
    const onChangePw = (e) => {
        const value = e.target.value;
        setPw(value);
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        if (!pwRegex.test(value)) {
            setPwError('비밀번호는 문자, 숫자를 포함하여 8~20자 사이여야 합니다.');
        } else {
            setPwError('');
        }
    }
    const onChangeName = (e) => {
        const value = e.target.value;
        setName(value);
        if (value.trim() === '') {
            setNameError('이름을 입력해주세요.');
        } else {
            setNameError('');
        }
    }
    const onChangeBirthday = (e) => {
        const value = e.target.value;
        setBirthday(value);
        const birthdayRegex = /^\d{8}$/; // 생년월일은 8자리 숫자여야 함
        if (!birthdayRegex.test(value)) {
            setBirthdayError('생년월일은 8자리 숫자로 입력해주세요.');
        } else {
            setBirthdayError('');
        }
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

    const [percentValue, setPercentValue] = useState([51, 51, 51, 51]);

    const setSignupDataWithExpiry = (key, value, expiryInMinutes) => {
        const now = new Date();
        const dataWithExpiry = {
            value, // 실제 데이터
            expiry: now.getTime() + expiryInMinutes * 60 * 1000 // 만료 시간 (밀리초 단위)
        };
        localStorage.setItem(key, JSON.stringify(dataWithExpiry));
    }; // 저장하기

    const getSignupDataWithExpiry = (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null; // 데이터가 없는 경우
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            // 만료된 경우 데이터 삭제
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }; // 가져오기

    useEffect(() => {
        const savedData = getSignupDataWithExpiry('signupData');
        console.log(savedData);
        if (savedData) {
            setId(savedData.id || "");
            setPw(savedData.pw || "");
            setName(savedData.name || "");
            setBirthday(savedData.birthday || "");
            setGender(savedData.gender || "");
            setNickName(savedData.nickName || "");
            setProfilePicture(savedData.profilePicture || null);
        }
        const mbtiSavedData = getSignupDataWithExpiry('mbtiResult');
        if (mbtiSavedData) {
            const parsedArray = JSON.parse(mbtiSavedData);
            setIE(parsedArray[0].split(' ')[0])
            setSN(parsedArray[1].split(' ')[0])
            setFT(parsedArray[2].split(' ')[0])
            setPJ(parsedArray[3].split(' ')[0])
            setPercentValue((prevValues) => {
                const newValues = [...prevValues];
                parsedArray.forEach((item, index) => {
                    newValues[index] = item.split(' ')[1];
                });
                return newValues;
            });
        }
    }, []); // 사용하기

    const onClickMBTItest = () => {
        const signupData = {
            id: id,
            pw: pw,
            name: name,
            birthday: birthday,
            gender: gender,
            nickName: nickName,
        };
        // 5분 후 만료
        setSignupDataWithExpiry('signupData', signupData, 5);
        setSignupDataWithExpiry('pageData', '/signUp', 5);
        navigate('/MBTItest')
    } // 적용



    const handleChange = (percentIndex) => (event) => {
        const newValue = parseFloat(event.target.value, 10); // 값을 정수로 변환
        setPercentValue(prevValues => {
            const updatedValues = [...prevValues];
            updatedValues[percentIndex] = newValue;
            return updatedValues;
        });
    };

    const handleIEClick = (value) => {
        setIE(value);
    };

    const handleSNClick = (value) => {
        setSN(value);
    };

    const handleFTClick = (value) => {
        setFT(value);
    };

    const handlePJClick = (value) => {
        setPJ(value);
    };
    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <>
            <Wrapper>
                <LogoWrapper>
                    <Logo onClick={handleGoHome} src='/Img/Logo2.png'></Logo>
                </LogoWrapper>
                <ContentsWrapper>
                    <ProgressBar>
                        <Progress style={{ marginLeft: step === 1 ? "0" : step === 2 ? "25%" : step === 3 ? "50%" : "75%" }}></Progress>
                    </ProgressBar>
                    <AnimatePresence>
                        {step === 1 && (
                            <UserInfoForm
                                id={id}
                                pw={pw}
                                name={name}
                                birthday={birthday}
                                gender={gender}
                                onChangeId={onChangeId}
                                onChangePw={onChangePw}
                                onChangeName={onChangeName}
                                onChangeBirthday={onChangeBirthday}
                                onClickWoman={onClickWoman}
                                onClickMan={onClickMan}
                                goToSecondPage={goToSecondPage}
                                pageVariants={pageVariants}
                                idError={idError}
                                pwError={pwError}
                                nameError={nameError}
                                birthdayError={birthdayError}
                            />
                        )}
                        {step === 2 && (
                            <MBTIForm
                                IE={IE}
                                SN={SN}
                                FT={FT}
                                PJ={PJ}
                                percentValue={percentValue}
                                handleIEClick={handleIEClick}
                                handleSNClick={handleSNClick}
                                handleFTClick={handleFTClick}
                                handlePJClick={handlePJClick}
                                handleChange={handleChange}
                                goToFirstPage={goToFirstPage}
                                goToThirdPage={goToThirdPage}
                                pageVariants={pageVariants}
                                onClickMBTItest={onClickMBTItest}
                            />
                        )}
                        {step === 3 && (
                            <ProfileForm
                                imgFile={imgFile}
                                handleProfilePictureChange={handleProfilePictureChange}
                                imgRef={imgRef}
                                nickName={nickName}
                                onChangeNickName={onChangeNickName}
                                goToSecondPage={goToSecondPage}
                                goToFourthPage={onClickSubmit}
                                pageVariants={pageVariants}
                            />
                        )}
                        {step === 4 && (
                            <SignUpComplete
                                imgFile={imgFile}
                                onClickLogin={onClickLogin}
                                pageVariants={pageVariants}
                            />
                        )}
                    </AnimatePresence>
                </ContentsWrapper>
            </Wrapper>
        </>
    );
}
