import React from 'react';
import styled from 'styled-components';
const ReviewImg=styled.img`
    width: 160px;
    height: 120px;
    object-fit: cover;
`

const Wrapper=styled.div`
    width: 160px;
    height: 120px;
    background-color: pink;
    border-radius: 15px;
    border: 1px solid white;
    overflow: hidden;
`
const OverlayText = styled.div`
    position: absolute;
    color: black;
    font-weight: bold;
    text-align: left;
    top: 50%;
    margin-left: 10px;
    & > p:nth-of-type(1) {
        font-size: 15px; 
        color: white;
        margin-bottom: 5px;
        font-family: Regular;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
    & > p:nth-of-type(2) {
        font-family: Regular;
        color: white;
        font-size: 12px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
`;
const Mainreview = ({ review }) => {
    return(
        <>
            <Wrapper>
                <ReviewImg src={review.image}></ReviewImg>
                <OverlayText>
                    <p>{review.title}</p>
                    <p>{review.sentence}</p>
                </OverlayText>
            </Wrapper>

        </>
    )
}

export default Mainreview;
