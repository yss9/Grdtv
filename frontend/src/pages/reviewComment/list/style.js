import styled from "styled-components";

export const CommentListWrapper = styled.div`
    width: 100%;
    margin-top: 20px;
`;

export const CommentItem = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Username = styled.span`
    font-weight: bold;
`;

export const CommentDate = styled.span`
    font-size: 0.875rem;
    color: #888;
`;

export const CommentContent = styled.p`
    margin-top: 5px;
    line-height: 1.5;
`;

export const NoComments = styled.div`
    text-align: center;
    color: #888;
    margin-top: 20px;
`;

export const DeleteButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #ff7875;
    }
`;
