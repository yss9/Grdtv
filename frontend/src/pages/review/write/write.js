
import {ChangeEvent, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import * as S from "./MarketBoardWrite-styles";
import { Switch } from 'antd';
import DaumPostcodeEmbed from "react-daum-postcode";
import {Modal, Button, Popover} from 'antd'
import Cookies from "js-cookie";

export default function BoardWrite(props){
    const router = useRouter()
    const [reqData, setReqData] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")



    const [isActive, setIsActive] = useState(false)
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [priceError, setPriceError] = useState("");

    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null)




    const onChangeTitle = (event) => {
        setTitle(event.target.value)

        if (event.target.value !== "") {
            setTitleError("");
        }

        if (
            event.target.value !== "" && body !== ""
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };


    const onChangeContent = (event) => {
        setBody(event.target.value);

        if (event.target.value !== "") {
            setContentError("");
        }

        if (
            title !== "" &&
            event.target.value !== ""
        ) {
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
            setContentError("내용을 입력해주세요.");
        }

        if (title !== "" && body !== "") {




            const combinedString = `${address}, ${addressDetail}`;

            const formData = new FormData();

            formData.append('image', image);
            formData.append('title', title);
            formData.append('body', body);
            formData.append('address', combinedString);


            const result = await axios.post("http://127.0.0.1:8000/board/", formData)
                .then(function (response) {
                    console.log(response.data);
                    alert("게시물 등록이 정상적으로 완료되었습니다!");
                    router.push(`/marketBoard/${response.data.boardID}`);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const onClickUpdate = async () => {

        const {boardID} = router.query

        if (
            title === "" &&
            body === "" &&
            !image
        ) {
            alert("수정한 내용이 없습니다.");
            return;
        }


        if (title !== "" && body !== "" && image) {


            const combinedString = `${address}, ${addressDetail}`;

            const formData = new FormData();

            formData.append('image', image);
            formData.append('title', title);
            formData.append('content', body);
            formData.append('address', combinedString);


            const result = await axios.put(`http://127.0.0.1:8000/board/${boardID}/`, formData)
                .then(function (response) {
                    console.log(response.data);
                    alert("게시물 수정이 정상적으로 완료되었습니다!");
                    router.push(`/marketBoard/${response.data.boardID}`);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }




    return (
        <>
            <S.Wrapper>
                <S.Title>{props.isEdit ? "상품 등록 수정" : "상품 등록"}</S.Title>


                <S.InputWrapper>
                    <S.Label>제목</S.Label>
                    <S.Subject
                        type="text"
                        placeholder="제목을 작성해주세요."
                        onChange={onChangeTitle}
                        /*defaultValue={props.data?.fetchBoard.title}*/
                    />
                    <S.Error>{titleError}</S.Error>
                </S.InputWrapper>



                <S.InputWrapper>
                    <S.Label>설명</S.Label>
                    <S.Contents
                        placeholder="설명을 작성해주세요."
                        onChange={onChangeContent}
                        /* defaultValue={props.data?.fetchBoard.contents}*/
                    />
                    <S.Error>{contentError}</S.Error>
                </S.InputWrapper>


                <S.ImageWrapper>
                    <S.Label>상품 사진을 추가해주세요!</S.Label>
                    <input type="file" onChange={handleImageChange} />
                </S.ImageWrapper>


                <S.InputWrapper>
                    <S.Label>주소</S.Label>
                    <S.ZipcodeWrapper>
                        <S.Zipcode
                            placeholder="07250"
                            readOnly
                            value={zipcode}
                        />
                        <S.SearchButton onClick={onClickAddressSearch}>
                            우편번호 검색
                        </S.SearchButton>
                        {isOpen &&(
                            <Modal title="위치를 추가해주세요!"
                                   open={true}
                                   onOk={onClickAddressSearch}
                                   onCancel={onClickAddressSearch}>
                                <DaumPostcodeEmbed onComplete={onCompleteAddressSearch}/>
                            </Modal>
                        )}
                    </S.ZipcodeWrapper>
                    <S.Address
                        readOnly
                        value={address}
                    />
                    <S.Address
                        onChange={onChangeAddressDetail}
                    />
                </S.InputWrapper>

                <S.ButtonWrapper>
                    <S.SubmitButton
                        onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                        isActive={props.isEdit ? true : props.isActive}
                    >
                        {props.isEdit ? "수정하기" : "등록하기"}
                    </S.SubmitButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </>

    )

}
=======
import React, { useState } from 'react';
import axios from 'axios';

const Write = () => {
    const [post, setPost] = useState({}); // 포스트 데이터 상태
    const [file, setFile] = useState(null); // 파일 상태

    // 포스트 데이터 변경 핸들러
    const changeValue = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    // 파일 선택 핸들러
    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('post', JSON.stringify(post));

        try {
            // Axios를 사용하여 파일과 포스트 데이터를 서버로 전송
            await axios.post('http://localhost:8080/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // 요청이 성공하면 홈페이지로 이동
            window.location.href = '/';
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={changeValue} />
            {/* title 입력 필드 */}
            <input type="text" name="body" onChange={changeValue} />
            {/* body 입력 필드 */}
            <input type="file" onChange={selectFile} />
            {/* 파일 선택 필드 */}
            <button type="submit">등록</button>
            {/* 제출 버튼 */}
        </form>
    );
};

export default Write;
