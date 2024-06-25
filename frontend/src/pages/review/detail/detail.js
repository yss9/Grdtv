// BoardDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./style";
import TopBarComponent from "../../../components/TopBar/TopBar";
import { Avatar, AvatarWrapper } from "./style";
import MapComponent from "./MapComponent"; // MapComponent import

export default function BoardDetail() {
    const { boardID } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [address, setAddress] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${boardID}/`);
            const postData = response.data;

            setTitle(postData.title);
            setBody(postData.body);
            setImage(postData.image); // 이미지 파일 경로 설정
            setAddress(postData.address);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [boardID]);

    useEffect(() => {
        if (image) {
            console.log('Image path:', image);
        }
    }, [image]);

    const onClickBoardDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${boardID}/`);
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            navigate("/review");
        } catch (error) {
            console.log(error);
        }
    };

    const onClickReport = async () => {
        try {
            await axios.post(`http://localhost:8080/api/posts/${boardID}/report/`, {
                boardID: boardID,
            });
            alert("신고접수가 성공적으로 완료되었습니다!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <TopBarComponent />
            <S.Container>
                <S.Wrapper>
                    <S.CardWrapper>
                        <S.Header>
                            <S.Info>
                                <S.TitleWrapper>
                                    <S.Title>{title}</S.Title>
                                </S.TitleWrapper>
                                <AvatarWrapper>
                                    <Avatar />
                                    <S.Writer>진나은</S.Writer>
                                </AvatarWrapper>
                            </S.Info>
                            <S.SubWrapper>
                                <S.Url>Url 복사</S.Url>
                                <S.Favorite>favorite</S.Favorite>
                            </S.SubWrapper>
                        </S.Header>
                        <S.Body>
                            <S.AddressWrapper>
                                <S.AddressImage />
                                <S.Address>{address}</S.Address>
                            </S.AddressWrapper>
                            <S.MapWrapper>
                                <MapComponent address={address} /> {/* MapComponent 사용 */}
                            </S.MapWrapper>
                            <S.Contents>{body}</S.Contents>
                            <S.ImageWrapper>
                                {image && <img src={`http://localhost:8080/${image.replace('src/main/resources/static/', '')}`} alt="Post Image" style={{ width: '100%' }} />}
                            </S.ImageWrapper>
                        </S.Body>
                    </S.CardWrapper>
                    <S.BottomWrapper>
                        <Button onClick={() => navigate("/review")}>목록으로</Button>
                        <Button onClick={() => navigate(`/board/${boardID}/edit`)}>수정하기</Button>
                        <Button onClick={onClickBoardDelete}>삭제하기</Button>
                    </S.BottomWrapper>
                </S.Wrapper>
            </S.Container>
        </>
    );
}
