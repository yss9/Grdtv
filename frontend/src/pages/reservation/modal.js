import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    max-width: 800px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    padding: 30px;
    overflow-y: auto;
    max-height: 80vh;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 24px;
    color: #333;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
`;

const AgentInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const AgentImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
`;

const AgentName = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
`;

const AgentIntro = styled.p`
    color: #555;
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;
`;

const HashtagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const Hashtag = styled.span`
    background-color: #4e53ee;
    color: white;
    border-radius: 15px;
    padding: 5px 10px;
    margin: 5px;
    font-size: 14px;
`;

const SpecList = styled.ul`
    list-style-type: disc;
    padding-left: 20px;
    text-align: left;
    margin-bottom: 20px;
    color: #555;
`;

const SpecItem = styled.li`
    margin-bottom: 5px;
`;

const ReviewList = styled.div`
    margin-top: 20px;
`;

const ReviewItem = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    &:hover {
        transform: translateY(-5px);
    }
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;

const StarContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StarWrapper = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 5px;
`;

const Star = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    fill: #ddd;
`;

const FilledStar = styled(Star)`
    fill: #FF9D2A;
    clip-path: ${({ percentage }) => `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`};
`;

const ReviewContent = styled.p`
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.5;
    color: #555;
`;

const NoReviews = styled.p`
    text-align: center;
    font-size: 18px;
    color: #777;
`;

const NavigationButton = styled.button`
    background-color: #4e53ee;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Modal = ({ agentId, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;
    const nickname = agentId.author;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookReviews/agent/review`, {
                    params: {
                        nickname: nickname
                    }
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Failed to fetch agent reviews:', error);
            }
        };

        if (agentId) {
            fetchReviews();
        }
    }, [agentId, nickname]);

    const renderStars = (starCount) => {
        return (
            <StarContainer>
                {[...Array(5)].map((_, index) => {
                    const isHalfStar = starCount >= index + 0.5 && starCount < index + 1;
                    const isFullStar = starCount >= index + 1;
                    const fillPercentage = isFullStar ? 100 : isHalfStar ? 50 : 0;

                    return (
                        <StarWrapper key={index}>
                            <Star xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 .587l3.668 7.431 8.168 1.176-5.918 5.769 1.397 8.137L12 18.902l-7.315 3.848 1.397-8.137L.164 9.194l8.168-1.176z" />
                            </Star>
                            <FilledStar
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                percentage={fillPercentage}
                            >
                                <path d="M12 .587l3.668 7.431 8.168 1.176-5.918 5.769 1.397 8.137L12 18.902l-7.315 3.848 1.397-8.137L.164 9.194l8.168-1.176z" />
                            </FilledStar>
                        </StarWrapper>
                    );
                })}
            </StarContainer>
        );
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * reviewsPerPage < reviews.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Overlay onClick={onClose} />
            <ModalWrapper>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <AgentInfo>
                    <AgentImage src={agentId.image} alt={`${agentId.author}의 사진`} />
                    <AgentName>{agentId.author}</AgentName>
                    <AgentIntro>{agentId.introduce}</AgentIntro>
                    <HashtagList>
                        {agentId.hashtags.map((tag, index) => (
                            <Hashtag key={index}>{tag}</Hashtag>
                        ))}
                    </HashtagList>
                    <SpecList>
                        {agentId.spec.map((specItem, index) => (
                            <SpecItem key={index}>{specItem}</SpecItem>
                        ))}
                    </SpecList>
                </AgentInfo>
                <ReviewList>
                    {reviews.length > 0 ? (
                        reviews
                            .slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)
                            .map((review, index) => (
                                <ReviewItem key={index}>
                                    <ReviewHeader>
                                        {renderStars(review.star)}
                                    </ReviewHeader>
                                    <ReviewContent>{review.content}</ReviewContent>
                                </ReviewItem>
                            ))
                    ) : (
                        <NoReviews>리뷰가 없습니다.</NoReviews>
                    )}
                </ReviewList>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <NavigationButton onClick={handlePrevPage} disabled={currentPage === 0}>
                        &lt;
                    </NavigationButton>
                    <NavigationButton
                        onClick={handleNextPage}
                        disabled={(currentPage + 1) * reviewsPerPage >= reviews.length}
                    >
                        &gt;
                    </NavigationButton>
                </div>
            </ModalWrapper>
        </>
    );
};

export default Modal;
