import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDate } from "../../common/libraries/utils";
import { Button, Popover, Modal } from 'antd';
import DaumPostcodeEmbed from "react-daum-postcode";
import { Link, useParams, useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용
import * as S from "./style";
import TopBarComponent from "../../../components/TopBar/TopBar";
import {Avatar, AvatarWrapper} from "./style";


export default function BoardDetail() {

    const { boardID } = useParams();
    const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

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
            setAddress(postData.address);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [boardID]);

    const onClickBoardDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${boardID}/`);
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            navigate("/review"); // navigate 함수로 페이지 이동
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
            <TopBarComponent/>
            <S.Container>
            <S.Wrapper>
                <S.CardWrapper>
                    <S.Header>
                        <S.Info>
                            <S.TitleWrapper>
                            <S.Title>{title}라멘의 모든 것</S.Title>
                            </S.TitleWrapper>
                            <AvatarWrapper>
                            <Avatar/>
                            <S.Writer>김라멘</S.Writer>
                                <p style={{fontFamily:"Regular", color:"#9D9D9D"}}>2024.4.27</p>
                            </AvatarWrapper>
                        </S.Info>
                        <S.SubWrapper>
                            <S.Url>URL 복사</S.Url>
                            <S.Favorite>즐겨찾기</S.Favorite>
                        </S.SubWrapper>
                    </S.Header>
                    <S.Body>
                        <S.AddressWrapper>
                            <S.AddressImage/>
                            <S.Address>{address}</S.Address>
                        </S.AddressWrapper>
                        <S.Contents>{body}</S.Contents>
                        <S.ImageWrapper>
                            <S.Image/>
                        </S.ImageWrapper>
                    </S.Body>
                </S.CardWrapper>
                <S.BottomWrapper>
                    <Button onClick={() => navigate("/review")}>목록으로</Button> {/* navigate 함수로 페이지 이동 */}
                    <Button onClick={() => navigate(`/board/${boardID}/edit`)}>수정하기</Button> {/* navigate 함수로 페이지 이동 */}
                    <Button onClick={onClickBoardDelete}>삭제하기</Button>
                </S.BottomWrapper>
            </S.Wrapper>
            </S.Container>
        </>
    );
}
