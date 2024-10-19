import styled from "@emotion/styled";
import Kyoto from '../../../public/Img/kyoto.png';
import Osaka from '../../../public/Img/osaka.png';
import Paris from '../../../public/Img/paris.png';
import ThaiMarket from '../../../public/Img/thaimarket.png'
import Alps from '../../../public/Img/alps.png'
import Sushi from '../../../public/Img/sushi.png'

const MyReviewData = [
    { title: '제목1', image: Kyoto, date: '날짜1' },
    { title: '제목2', image: Osaka, date: '날짜2' },
    { title: '제목3', image: Paris, date: '날짜3' },
    { title: '제목4', image: ThaiMarket, date: '날짜4' },
    { title: '제목5', image: Alps, date: '날짜5' },
    { title: '제목6', image: Sushi, date: '날짜6' },
];

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

function MyReviewComponent({ title, image, date }) {
    return (
        <Container>
            <Thumbnail src={image} />
            <Title>{title}</Title>
            <Date>{date}</Date>
        </Container>
    );
}

export default function MyReviews() {
    return (
        <Wrapper>
            {MyReviewData.map((review, index) => (
                <MyReviewComponent
                    key={index}
                    title={review.title}
                    image={review.image}
                    date={review.date}
                />
            ))}
        </Wrapper>
    );
}
