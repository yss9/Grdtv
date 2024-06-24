// BoardWrite.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./style";
import { Modal } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import TopBarComponent from "../../../components/TopBar/TopBar";
import MapComponent from "./MapComponent";

export default function BoardWrite(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState("");
    const [bodyError, setBodyError] = useState("");

    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [zipcode, setZipcode] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                document.getElementById('autocomplete'),
                { types: ['geocode'] }
            );
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    handlePlaceSelect(place);
                }
            });
        }
    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const onClickAddressSearch = () => {
        setIsOpen(true);
    };

    const handlePlaceSelect = (place) => {
        setAddress(place.formatted_address);
        setIsOpen(false);
    };

    const onClickSubmit = async () => {
        if (title === "") {
            setTitleError("제목을 입력해주세요.");
        }
        if (body === "") {
            setBodyError("내용을 입력해주세요.");
        }

        if (title !== "" && body !== "") {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('body', body);
            formData.append('address', address);

            try {
                const response = await axios.post("http://localhost:8080/api/posts/", formData);
                console.log(response.data);
                alert("게시물 등록이 정상적으로 완료되었습니다!");
                navigate(`/board/${response.data.boardID}`);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onClickUpdate = async () => {
        const boardID = new URLSearchParams(window.location.search).get('boardID');

        if (title === "" && body === "" && !image) {
            alert("수정할 내용이 없습니다.");
            return;
        }

        if (title !== "" && body !== "" && image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('body', body);
            formData.append('address', address);

            try {
                const response = await axios.put(`http://localhost:8080/api/posts/${boardID}/`, formData);
                console.log(response.data);
                alert("게시물 수정이 정상적으로 완료되었습니다!");
                navigate(`/board/${response.data.boardID}`);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <TopBarComponent />
            <S.Container>
                <S.Wrapper>
                    <S.Title>{props.isEdit ? "Review 수정" : "리뷰 작성하기"}</S.Title>

                    <S.InputWrapper>
                        <S.Subject
                            type="text"
                            placeholder="제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <S.Error>{titleError}</S.Error>
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.Contents
                            placeholder="내용을 입력해주세요."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <S.Error>{bodyError}</S.Error>
                    </S.InputWrapper>

                    <S.MapWrapper>
                        <S.Label>지도</S.Label>
                        <MapComponent address={address} setAddress={setAddress} />
                    </S.MapWrapper>

                    <S.ImageWrapper>
                        <S.Label>사진 추가</S.Label>
                        <input type="file" onChange={handleImageChange} />
                    </S.ImageWrapper>

                    <S.InputWrapper>
                        <S.Label>위치정보</S.Label>
                        <S.ZipcodeWrapper>
                            <S.Zipcode placeholder="우편번호" readOnly value={zipcode} />
                            <S.SearchButton onClick={onClickAddressSearch}>
                                위치검색
                            </S.SearchButton>
                            {isOpen && (
                                <Modal
                                    title="위치 검색"
                                    open={isOpen}
                                    onCancel={() => setIsOpen(false)}
                                    footer={null}
                                >
                                    {/* 구글 장소 검색 입력 */}
                                    <input
                                        type="text"
                                        id="autocomplete"
                                        placeholder="주소를 입력하세요"
                                        style={{ width: "100%", padding: "10px" }}
                                    />
                                </Modal>
                            )}
                        </S.ZipcodeWrapper>
                        <S.Address
                            placeholder="주소를 입력하세요"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <S.Address
                            placeholder="상세주소를 입력하세요"
                            value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)}
                        />
                    </S.InputWrapper>

                    <S.ButtonWrapper>
                        <Link to={props.isEdit ? "#" : "/board"}>
                            <S.SubmitButton
                                onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                                isActive={title !== "" && body !== ""}
                            >
                                {props.isEdit ? "수정" : "저장"}
                            </S.SubmitButton>
                        </Link>
                    </S.ButtonWrapper>
                </S.Wrapper>
            </S.Container>
        </>
    );
}
