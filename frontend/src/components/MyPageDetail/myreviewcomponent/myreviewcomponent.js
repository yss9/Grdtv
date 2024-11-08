import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* 2 columns */
    row-gap: 3rem;
`;

const Container = styled.div`
    width: 450px;
    height: 500px;
    overflow: hidden;
    position: relative;
    border-radius: 20px;
    margin: auto; /* Horizontally center the component */
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background-color: pink;
`;

const Title = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
`;

const Date = styled.div`
    position: absolute;
    top: 4rem;
    left: 1rem;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
`;

function MyReviewComponent({ title, thumbnail, date }) {
    const formattedDate = date ? date.split('T')[0] : 'No date available';

    return (
        <Container>
            <Thumbnail src={thumbnail}/>
            <Title>{title}</Title>
            <Date>{formattedDate}</Date>
        </Container>
    );
}

export default function MyReviews() {
    const [reviews, setReviews] = useState([]);
    const token = Cookies.get('jwt');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const nickname = decodedToken.nickname; // extract nickname from token

                    const response = await axios.get(`http://localhost:8080/api/posts/user/${nickname}`);
                    setReviews(response.data); // Set reviews from backend response
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [token]);

    return (
        <Wrapper>
            {reviews.map((review) => (
                <MyReviewComponent
                    key={review.boardID}
                    title={review.title}
                    date={review.createDate}
                    thumbnail={review.thumbnail}
                />
            ))}
        </Wrapper>
    );
}