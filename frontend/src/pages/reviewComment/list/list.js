import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./style"; // 스타일 파일 import
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function BoardCommentList() {
    const { boardID } = useParams(); // URL에서 boardID 가져오기
    const [comments, setComments] = useState([]); // 댓글 목록 상태

    const [nickname, setNickname] = useState("");

    const token = Cookies.get('jwt');

    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                const extractedNickname = userPayload.nickname;
                setNickname(extractedNickname);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);

    // 댓글 데이터 가져오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/${boardID}`);
            setComments(response.data); // 댓글 목록 상태 업데이트
            console.log("댓글 목록:", response.data);
        } catch (error) {
            console.error("댓글 불러오기 실패:", error);
        }
    };

    // 댓글 삭제 요청
    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
            // 댓글 삭제 후 댓글 목록을 다시 가져오기
            fetchComments();
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        }
    };

    // 컴포넌트가 마운트될 때 댓글 가져오기
    useEffect(() => {
        fetchComments();
    }, [boardID]);

    return (
        <S.CommentListWrapper>
            {comments.length === 0 ? (
                <S.NoComments>아직 댓글이 없습니다.</S.NoComments>
            ) : (
                comments.map((comment) => {
                    console.log("댓글 ID:", comment.commentId);

                    return (
                        <S.CommentItem key={comment.id}>
                            <S.CommentHeader>
                                <S.Username>{comment.username}</S.Username>
                                <S.CommentDate>
                                    {new Date(comment.createDate).toLocaleString()}
                                </S.CommentDate>
                            </S.CommentHeader>
                            <S.CommentContent>{comment.content}</S.CommentContent>
                            {/* 닉네임 비교하여 삭제 버튼 조건부 렌더링 */}
                            {comment.username === nickname && (
                                <S.DeleteButton onClick={() => deleteComment(comment.commentId)}>
                                    삭제하기
                                </S.DeleteButton>
                            )}
                        </S.CommentItem>
                    );
                })
            )}
        </S.CommentListWrapper>
    );
}
