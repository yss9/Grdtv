import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset'
import {Container, TitleBar, Title, BestReview1, Contain, BestReview4, BestReview2,
    BestReviewsWrapper, CountryPicture, BestReview3, BestReview, HorizonalLine,
    BestReviewContainer, NoFlex, Picture, Text,
} from '../../pages/reviewPage/reviewPageStyle';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function BoardsMyPage() {
    const [imageIndex, setImageIndex] = useState(0); // 이미지 인덱스 상태 변수

    // 이미지 변경 효과
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // 이미지 목록
    const images = [
        "img/paris.jpg",
        "img/france.jpg",
        "img/france2.jpg",
        "img/france4.jpg"
    ];

    return (
        <>
            <Reset/>
            <Container>
                <TitleBar>
                    <Title>Travien</Title>
                </TitleBar>
                <Contain>
                    <Picture>
                        {/* 이미지 인덱스에 따라 이미지 변경 */}
                        <CountryPicture src={images[imageIndex]}/>
                        <Text>France</Text>
                    </Picture>
                    <NoFlex>
                        <BestReview>Best Review</BestReview>
                        <Link to={"/scroll"}><BestReviewsWrapper>
                            <BestReview1></BestReview1>
                            <BestReview2></BestReview2>
                            <BestReview3></BestReview3>
                            <BestReview4></BestReview4>
                        </BestReviewsWrapper></Link>
                        <BestReview>New Review</BestReview>
                        <BestReviewsWrapper>
                            <BestReview1></BestReview1>
                            <BestReview2></BestReview2>
                            <BestReview3></BestReview3>
                            <BestReview4></BestReview4>
                        </BestReviewsWrapper>
                    </NoFlex>
                </Contain>
            </Container>
        </>
    )
}
