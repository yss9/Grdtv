import styled from "styled-components";

// 댓글 목록을 감싸는 Wrapper
export const CommentListWrapper = styled.div`
    width: 100%;
    margin-top: 20px;
`;

// 댓글 아이템
export const CommentItem = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
`;

// 댓글 작성자 이름과 날짜를 포함하는 헤더
export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 사용자 이름 스타일
export const Username = styled.span`
    font-weight: bold;
`;

// 댓글 날짜 스타일
export const CommentDate = styled.span`
    font-size: 0.875rem;
    color: #888;
`;

// 댓글 내용 스타일
export const CommentContent = styled.p`
    margin-top: 5px;
    line-height: 1.5;
`;

// 댓글이 없을 때 메시지
export const NoComments = styled.div`
    text-align: center;
    color: #888;
    margin-top: 20px;
`;


