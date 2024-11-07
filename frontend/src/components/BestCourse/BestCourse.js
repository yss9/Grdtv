import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const BlogContainer = styled.img`
    width: 15rem;
    height: 18rem;
    background-color: #d9d9d9;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    object-fit: cover;
`;

const PlaceName = styled.div`
    text-align: center;
    margin-top: 0.8rem;
    font-family: "Regular";
    font-size: 18px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
`;

const BestCourse = ({ review, image }) => {
    const navigate = useNavigate();

    const handleGoInformation = (placename) => {
        navigate(`/recomendation/information/${placename}`); // URL에 선택된 장소 이름을 추가하여 전달
    };

    return (
        <Container key={review.placename} onClick={() => handleGoInformation(review.placename)}>
            {image ? (
                <BlogContainer src={image} alt={review.placename} />
            ) : (
                <BlogContainer src="" alt="Loading image..." style={{ backgroundColor: '#d9d9d9' }} />
            )}
            <PlaceName>{review.placename}</PlaceName>
        </Container>
    );
};

export default BestCourse;
