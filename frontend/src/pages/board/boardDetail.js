import React, {useState} from 'react';
import styled from 'styled-components';
import TopBarComponent from "../../components/TopBar/TopBar";

const ramenReview = {
    title: '라멘의 모든 것',
    author: '김라멘',
    date: '2024.6.27',
    location: '도쿄, 일본',
    content1: '일주일 전에 다녀온 일본 여행. 그중에서 음식점을 추천해볼까 해요. 일본 여행을 계획하면서 가장 기대했던 것 중 하나는 다양한 라멘을 맛보는 것이었어요.',
    image1: '/ramen1.jpg',
    content2: '첫 번째로 방문한 곳은 도쿄 신주쿠에 위치한 유명한 라멘 가게입니다. 이곳은 현지인들뿐만 아니라 관광객들에게도 인기가 많아요. 가게에 들어서자마자 라멘 특유의 진한 향이 코를 자극했어요.',
    location2: '라멘 가게: 도쿄, 신주쿠',
    image2: '/ramen2.jpg',
    content3: '이곳의 라멘은 깊은 맛과 풍부한 육수로 유명합니다. 돼지뼈를 오랜 시간 고아 만든 육수는 감칠맛이 일품이었어요. 면도 쫄깃하고 탱탱해서 육수와 잘 어울렸어요.',
    location3: '라멘 가게 영업시간: 매일 11:00 - 22:00',
    image3: '/ramen3.jpg',
    content4: '두 번째로 방문한 라멘 가게는 아키하바라에 위치해 있습니다. 이곳은 특이하게도 매콤한 라멘으로 유명합니다. 매운 음식을 좋아하는 저는 도전해보기로 했어요.',
    location4: '라멘 가게: 도쿄, 아키하바라',
    image4: '/ramen4.jpg',
    content5: '매콤한 라멘은 입안에서 불이 나는 듯한 느낌이었지만, 그 매움 속에서도 깊은 맛이 느껴졌어요. 매운맛을 중화시켜주는 달걀과 돼지고기도 아주 훌륭했어요.',
    location5: '라멘 가게 영업시간: 매일 12:00 - 21:00',
    image5: '/ramen5.jpg',
    content6: '마지막으로 방문한 라멘 가게는 긴자에 위치한 고급 라멘 가게였습니다. 이곳은 조금 더 비싸지만, 그만큼 고급 재료를 사용해서 맛이 뛰어났어요.',
    location6: '라멘 가게: 도쿄, 긴자',
    image6: '/ramen6.jpg',
    content7: '긴자 라멘 가게의 특선 라멘은 황금빛 육수에 풍부한 해산물이 들어가 있어 독특한 맛을 자랑했어요. 면발도 아주 부드럽고, 식감이 좋아서 잊지 못할 맛이었어요.',
    location7: '라멘 가게 영업시간: 매일 11:00 - 23:00',
    image7: '/ramen1.jpg'
};

const BoardEx = () => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <div>
        <TopBarComponent/>
        <Container>
            <Title>{ramenReview.title}</Title>
            <AuthorImg src={ramenReview.image1}/>
            <Author>{ramenReview.author}
                <Date>{ramenReview.date}</Date>
                <p style={{marginTop:"50px"}}> URL 복사 </p> <p style={{left:"70%", marginTop:"50px"}}>즐겨찾기</p>
            </Author>
            <HorizontalLine></HorizontalLine>
            <ReviewCard>
                <Content>{ramenReview.content1}</Content>
                <Image src={ramenReview.image1} alt="라멘 이미지1"/>
                <Location>{ramenReview.location2}</Location>
                <Content>{ramenReview.content2}</Content>
                <Image src={ramenReview.image2} alt="라멘 이미지2"/>
                <Location>{ramenReview.location3}</Location>
                <Content>{ramenReview.content3}</Content>
                <Image src={ramenReview.image3} alt="라멘 이미지3"/>
                <Location>{ramenReview.location4}</Location>
                <Content>{ramenReview.content4}</Content>
                <Image src={ramenReview.image4} alt="라멘 이미지4"/>
                <Location>{ramenReview.location5}</Location>
                <Content>{ramenReview.content5}</Content>
                <Image src={ramenReview.image5} alt="라멘 이미지5"/>
                <Location>{ramenReview.location6}</Location>
                <Content>{ramenReview.content6}</Content>
                <Image src={ramenReview.image6} alt="라멘 이미지6"/>
                <Location>{ramenReview.location7}</Location>
                <Content>{ramenReview.content7}</Content>
                <Image src={ramenReview.image7} alt="라멘 이미지7"/>
            </ReviewCard>
            <HorizontalLine></HorizontalLine>
            <CommentsSection>
                <CommentsTitle>댓글</CommentsTitle>
                <CommentForm onSubmit={handleCommentSubmit}>
                    <CommentInput
                        type="text"
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="댓글을 작성하세요..."
                    />
                    <CommentButton type="submit">작성</CommentButton>
                </CommentForm>
                <CommentsList>
                    {comments.map((comment, index) => (
                        <Comment key={index}>{comment}</Comment>
                    ))}
                </CommentsList>
            </CommentsSection>
        </Container>
        </div>
    );
};

export default BoardEx;

const HorizontalLine = styled.div`
    width: 46%;
    height: 0.01vh;
    background-color: #000;
    margin: 30px 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const ReviewCard = styled.div`
    font-family: Regular;
    width: 80%;
    max-width: 800px;
    margin-bottom: 40px;
    padding: 20px;
    text-align: center;
`;

const Title = styled.h2`
    font-family: Title;
    font-size: 24px;
    margin-top: 70px;
    margin-bottom: 30px;
`;

const AuthorImg = styled.img`
    width: 40px; /* 원하는 크기로 설정 */
    height: 40px; /* 원하는 크기로 설정 */
    position: absolute;
    left: 44vh;
    top: 23.5vh;
    border-radius: 50%;
    object-fit: cover;
    margin-left:50px
`

const Author = styled.div`
    display: inline-block;
    font-family: Regular;
    font-size: 14px;
    color: #888;
    margin-top: 30px;
    margin-right:520px;
    p{
        position: absolute;
        left: 65%;
        top: 23.5vh;
        display: inline-block;
    }
`;

const Date = styled.span`
    padding-left: 15px;
    font-family: Regular;
    font-size: 14px;
    color: rgba(157, 157, 157, 1);
`;

const Location = styled.div`
    font-family: Regular;
    font-size: 14px;
    color: #888;
`;

const Image = styled.img`
    width: 80%;
    height: auto;
    margin-bottom: 15px;
    margin-top: 50px;
    
    
`;

const Content = styled.p`
    font-size: 16px;
    line-height: 1.6;
`;


const CommentsSection = styled.div`
    width: 80%;
    max-width: 800px;
    margin-top: 40px;
`;

const CommentsTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 20px;
`;

const CommentForm = styled.form`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
`;

const CommentButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const CommentsList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Comment = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    &:last-child {
        border-bottom: none;
    }
`;