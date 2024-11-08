import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
    gap: 1rem;
`;

const Container = styled.div`
    width: 25rem;
    height: 23rem;
    overflow: hidden;
    position: relative;
    margin: auto;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background-color: navy;
`;

function MyReviewComponent({ title, image, date }) {
    return (
        <Container>
            <Thumbnail src={image} />
        </Container>
    );
}

export default function Mytagcomponent() {
    const [reviews, setReviews] = useState([]); // Ensure the state is an array
    const token = Cookies.get("jwt");

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const Id = decodedToken.id; // Get user ID from token

                    const response = await axios.get(`http://localhost:8080/api/likes/user/${Id}`);

                    // Ensure the response data is an array
                    if (Array.isArray(response.data)) {
                        setReviews(response.data); // Set the data from the response
                    } else {
                        console.error("Response is not an array:", response.data);
                        setReviews([]); // Set reviews to an empty array in case of error
                    }
                }
            } catch (error) {
                console.error("Error fetching liked posts:", error);
                setReviews([]); // Set reviews to an empty array in case of error
            }
        };

        fetchLikedPosts();
    }, [token]);

    return (
        <Wrapper>
            {reviews.map((review) => (
                <MyReviewComponent
                    key={review.boardID}
                    title={review.title}
                    image={review.thumbnail}
                    date={review.createDate}
                />
            ))}
        </Wrapper>
    );
}
