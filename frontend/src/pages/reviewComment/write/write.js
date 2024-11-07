import {useEffect, useState} from "react";
import * as S from "./style";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function BoardCommentWrite({ boardID }) {

    // 쿠키에서 JWT 토큰 가져오기
    const token = Cookies.get('jwt');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [content, setContent] = useState("");
    const [nicknames, setNicknames] = useState([]);



    const onChangeContents = (event) => {
        setContent(event.target.value);
    };


    const onClickSubmit = async () => {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;
        console.log("boardID:", boardID)

        const payload = {
            boardID: boardID,
            userId: id,
            content: content,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/comments/", payload, {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': `Bearer ${token}` // Add authorization header if needed
                }
            });
            console.log(response.data);

            alert("댓글 등록 완료"); // Alert message

            navigate(`/board/${boardID}`);  // 직접 boardID를 사용
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert("댓글 등록에 실패했습니다."); // Alert for failure
        }
    };



    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNicknames(response.data);
                // console.log('nicknames:',response.data);

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                // console.log("userPayload:", userPayload);
                const extractedUsername = userPayload.nickname;
                setUsername(extractedUsername);
                // console.log("extractedUsername", extractedUsername);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);

    return (
        <S.CommentWrapper>
            <S.InputWrapper>
                <div>{username}님</div>
            </S.InputWrapper>
            <S.ContentsWrapper>
                <S.Contents
                    maxLength={100}
                    onChange={onChangeContents}
                    value={content}
                    placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                />
                <S.BottomWrapper>
                    <S.ContentsLength>{content.length}/100</S.ContentsLength>
                    <S.Button onClick={onClickSubmit}>등록하기</S.Button>
                </S.BottomWrapper>
            </S.ContentsWrapper>
        </S.CommentWrapper>
    );
}
