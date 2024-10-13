import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./style"; // 스타일 파일 import
import { useParams } from "react-router-dom";

export default function BoardCommentList() {
    const { boardID } = useParams(); // URL에서 boardID 가져오기
    const [comments, setComments] = useState([]); // 댓글 목록 상태

    // 댓글 데이터 가져오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/${boardID}`);
            setComments(response.data); // 댓글 목록 상태 업데이트
        } catch (error) {
            console.error("댓글 불러오기 실패:", error);
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
                comments.map((comment, index) => (
                    <S.CommentItem key={index}>
                        <S.CommentHeader>
                            <S.Username>{comment.username}</S.Username>
                            <S.CommentDate>{new Date(comment.createDate).toLocaleString()}</S.CommentDate>
                        </S.CommentHeader>
                        <S.CommentContent>{comment.content}</S.CommentContent>
                    </S.CommentItem>
                ))
            )}
        </S.CommentListWrapper>
    );
}
