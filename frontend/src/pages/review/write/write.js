import React, { useState } from "react";
import axios from "axios";
import * as S from "./style";
import { Switch, Modal, Button, Popover } from 'antd';
import DaumPostcodeEmbed from "react-daum-postcode";
import {Link, useNavigate} from "react-router-dom";
import {
    HelloIcon,
    HiButton,
    HiContainer,
    HiIcon,
    HiLabel,
    HiTitle, HiTitleWrapper,
    Map,
    PhotoBox,
    PhotoWrapper,
    PlusIcon
} from "./style";
import TopBarComponent from "../../../components/TopBar/TopBar";


export default function BoardWrite(props) {

    const navigate = useNavigate(); // useNavigate 훅 사용




    const [reqData, setReqData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userID, setUserID] = useState(0);

    const [isActive, setIsActive] = useState(false);
    const [titleError, setTitleError] = useState("");
    const [bodyError, setBodyError] = useState("");

    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const onChangeTitle = (event) => {
        setTitle(event.target.value);

        if (event.target.value !== "") {
            setTitleError("");
        }

        if (event.target.value !== "" && body !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    const onChangeBody = (event) => {
        setBody(event.target.value);

        if (event.target.value !== "") {
            setBodyError("");
        }

        if (title !== "" && event.target.value !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    const onChangeAddressDetail = (event) => {
        setAddressDetail(event.target.value);
    };

    const onClickAddressSearch = () => {
        setIsOpen((prev) => !prev);
    };

    const onCompleteAddressSearch = (data) => {
        setAddress(data.address);
        setZipcode(data.zonecode);
        setIsOpen((prev) => !prev);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const onClickSubmit = async () => {
        if (title === "") {
            setTitleError("제목을 입력해주세요.");
        }
        if (body === "") {
            setBodyError("내용을 입력해주세요.");
        }

        if (title !== "" && body !== "") {
            const combinedString = `${address}, ${addressDetail}`;

            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('body', body);


            try {
                const response = await axios.post("http://localhost:8080/api/posts/", formData);
                console.log(response.data);
                alert("게시물 등록이 정상적으로 완료되었습니다!");
                navigate(`/board/${response.data.boardID}`); // 페이지 이동

            } catch (error) {
                console.log(error);
            }
        }
    };

    const onClickUpdate = async () => {
        const boardID = new URLSearchParams(window.location.search).get('boardID');

        if (title === "" && body === "" && !image) {
            alert("수정한 내용이 없습니다.");
            return;
        }

        if (title !== "" && body !== "" && image) {
            const combinedString = `${address}, ${addressDetail}`;

            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('body', body);


            try {
                const response = await axios.put(`http://localhost:8080/api/posts/${boardID}/`, formData);
                console.log(response.data);
                alert("게시물 수정이 정상적으로 완료되었습니다!");
                window.location.href = `/board/${response.data.boardID}`;
            } catch (error) {
                console.log(error);
            }
        }
    };







    return (
        <>
            <TopBarComponent/>
            <S.Container>
            <S.Wrapper>
                {/* 제목 입력란 */}
                <S.Title>{props.isEdit ? "Review 수정" : "리뷰 작성하기"}</S.Title>

                {/* 등록 또는 수정 버튼 */}
                <S.ButtonWrapper>
                    <Link to={props.isEdit ? "#" : "/board"}> {/* 수정 모드일 경우, 링크를 비활성화할 수 있습니다. */}
                        <S.SubmitButton
                            onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                            isActive={props.isEdit ? true : props.isActive}
                        >
                            {props.isEdit ? "수정" : "저장"}
                        </S.SubmitButton>

                        <S.SaveButton
                            onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                            isActive={props.isEdit ? true : props.isActive}
                        >
                            {props.isEdit ? "수정" : "발행"}
                        </S.SaveButton>
                    </Link>
                </S.ButtonWrapper>



                <S.InputWrapper>
                    <S.Subject
                        type="text"
                        placeholder="제목"
                        onChange={onChangeTitle}
                    />
                    <S.Error>{titleError}</S.Error>
                </S.InputWrapper>

                {/* 내용 입력란 */}
                <S.InputWrapper>
                    <S.Contents
                        placeholder="내용을 입력해주세요."
                        onChange={onChangeBody}
                    />
                </S.InputWrapper>

                    <S.Error>{bodyError}</S.Error>

                <HiContainer>
                    <HiTitleWrapper>
                        <HiTitle>제목</HiTitle>
                        <HiButton>불러오기</HiButton>
                    </HiTitleWrapper>
                        <PhotoWrapper>
                            <PhotoBox>
                                <HiIcon/>
                                <HiLabel>여행지 입력</HiLabel>
                            </PhotoBox>
                            <HelloIcon/>
                            <PhotoBox>
                                <HiIcon />
                                <HiLabel>여행지 입력</HiLabel>
                            </PhotoBox>
                            <HelloIcon/>
                            <PhotoBox>
                                <HiIcon/>
                                <HiLabel>여행지 입력</HiLabel>
                            </PhotoBox>
                            <PlusIcon/>
                            <Map/>
                        </PhotoWrapper>
                    </HiContainer>

                {/* 사진 업로드 입력란 */}
                <S.ImageWrapper>
                    <S.Label>사진 추가</S.Label>
                    <input type="file" onChange={handleImageChange} />
                </S.ImageWrapper>

                <S.InputWrapper>
                    <S.Label>위치정보</S.Label>
                    <S.ZipcodeWrapper>
                        <S.Zipcode
                            placeholder="07250"
                            readOnly
                            value={zipcode}
                        />
                        <S.SearchButton onClick={onClickAddressSearch}>
                            우편번호 검색
                        </S.SearchButton>
                        {isOpen && (
                            <Modal
                                title="위치를 추가해주세요!"
                                open={true}
                                onOk={onClickAddressSearch}
                                onCancel={onClickAddressSearch}
                            >
                                <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
                            </Modal>
                        )}
                    </S.ZipcodeWrapper>
                    <S.AddressContainer>
                    <S.Address
                        readOnly
                        value={address}
                    />
                    <S.Address
                        onChange={onChangeAddressDetail}
                    />
                    </S.AddressContainer>
                </S.InputWrapper>

            </S.Wrapper>
            </S.Container>
        </>

    )



}