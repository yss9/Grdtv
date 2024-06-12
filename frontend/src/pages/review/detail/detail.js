import { useState, useEffect } from "react";
import axios from "axios";
import { getDate } from "../../common/libraries/utils";
import { Button, Popover, Modal } from 'antd';
import DaumPostcodeEmbed from "react-daum-postcode";
import { Link, useParams, useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용
import * as S from "./style";

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
            navigate("/board"); // navigate 함수로 페이지 이동
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
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.Info>
                        <S.Title>{title}</S.Title>
                        <S.Writer>진나은</S.Writer>
                    </S.Info>
                    <S.IconWrapper>
                        <Button danger onClick={onClickReport}>신고하기</Button>
                    </S.IconWrapper>
                </S.Header>
                <S.Body>
                    <S.Contents>{body}</S.Contents>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <Button onClick={() => navigate("/board")}>목록으로</Button> {/* navigate 함수로 페이지 이동 */}
                <Button onClick={() => navigate(`/board/${boardID}/edit`)}>수정하기</Button> {/* navigate 함수로 페이지 이동 */}
                <Button onClick={onClickBoardDelete}>삭제하기</Button>
            </S.BottomWrapper>
        </S.Wrapper>
    );
}
