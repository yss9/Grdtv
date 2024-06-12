import { useRouter } from "next/router";
//import BoardDetailUI from "./CommunityDetail-presenter";
import * as S from "./MarketBoardDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import { CommentOutlined } from '@ant-design/icons';
import React from 'react';
import { FloatButton , Button, Popover} from 'antd';
import Cookies from "js-cookie";


export default function BoardDetail() {
    const router = useRouter();

    const {boardID} = router.query

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [address, setAddress] = useState("")




    const [dataLoaded, setDataLoaded] = useState(false)
    const [deleteLoaded, setDeleteLoaded] = useState(false)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);




    const fetchData = async () => {
        try {
            // 이미지 및 게시물 데이터를 병렬로 불러오기
            const imageResponse = await axios.get(`http://127.0.0.1:8000/board/${boardID}/`)


            // 이미지 URL이 상대 경로로 저장되어 있으므로, 기본 URL과 결합하여 전체 URL 생성
            const baseURL = 'http://127.0.0.1:8000';
            const fullURL = baseURL + imageResponse.data.image;

            // 이미지를 불러오기
            const imageBlobResponse = await axios.get(fullURL, {
                responseType: 'arraybuffer',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (imageBlobResponse.status === 200) {
                const contentType = imageBlobResponse.headers['content-type'];
                const blob = new Blob([imageBlobResponse.data], {type: contentType});

                // Blob 데이터를 URL.createObjectURL을 사용하여 이미지 URL로 변환
                const objectURL = URL.createObjectURL(blob);
                setImageURL(objectURL);
            } else {
                console.error('Failed to fetch image');
            }


            console.log(imageResponse.data)

            // 게시물 데이터 설정
            setTitle(imageResponse.data.title);
            setContent(imageResponse.data.content);
            setDatetime(imageResponse.data.datetime);
            setAddress(imageResponse.data.address)



            setIsUserDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }







    const onClickBoardDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/board/${boardID}/`);

            console.log(response.data.boardID);
            router.push("/marketBoard/");
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            setDeleteLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };




    const onClickMoveToBoardEdit = () => {
        router.push(`/marketBoard/${boardID}/edit`);

    }



    const onClickReport = async () => {

        const result = await axios.post(`http://127.0.0.1:8000/board/${boardID}/report/`, {
            boardID: boardID,

        }, axiosConfig)

            .then(function (response) {
                console.log(response.data);

                alert("신고접수가 성공적으로 완료되었습니다!")


            })
            .catch(function (error) {
                console.log(error);
            })

    }


    return (
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.AvatarWrapper>
                        {/*<S.Avatar src="/images/avatar.png" />*/}
                        <S.Info>
                            <S.CreatedAt>
                                {getDate(datetime)}
                            </S.CreatedAt>
                        </S.Info>
                    </S.AvatarWrapper>
                    <S.IconWrapper>
                        <Popover content={address? address:"사용자가 위치설정을 하지 않았어요"} title="위치">
                            <Button type="primary" style={{marginRight: "30px"}}>여기서 만나요!</Button>
                        </Popover>
                        <Button danger onClick={onClickReport}>신고하기</Button>
                    </S.IconWrapper>
                </S.Header>
                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{content}</S.Contents>
                    <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched" />}</S.ImageWrapper>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/marketBoard")}>목록으로</S.Button>
                <S.Button onClick={onClickMoveToBoardEdit}>수정하기</S.Button>
                <S.Button onClick={onClickBoardDelete}>삭제하기</S.Button>


            </S.BottomWrapper>
        </S.Wrapper>
    )
}

