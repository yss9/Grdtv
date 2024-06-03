import {Wrapper} from "../review/reviewstyle";
import BestCourse from '../../components/BestCourse/BestCourse'
import { Reset } from 'styled-reset';
import React, {useState} from "react";
import {
    BestContainer, BestCourseContainer, BestCourses,
    BestTitle, BestTitleWrapper,
    BestWrapper,
    RecBtn, RecBtnWrapper, RecContainer, RecSubTitle,
    RecTitle, RecWrapper
} from "./routestyle";
import TopBarComponent from "../../components/TopBar/TopBar";
const CourseData=[
    { title: 'Course 1', content: 'This is the first blog', author: 'Author 1' },
    { title: 'Course 2', content: 'This is the second blog', author: 'Author 2' },
    { title: 'Course 3', content: 'This is the second blog', author: 'Author 3' },
    { title: 'Course 4', content: 'This is the first blog', author: 'Author 4' },
];
export default function RecomendationPage() {
    const [activeIndex, ] = useState(0);
    const reviewsPerPage = 4;

    const startIndex = activeIndex * reviewsPerPage;
    const visibleAgents = CourseData.slice(startIndex, startIndex + reviewsPerPage);

    return(
        <>
            <Reset/>
            <Wrapper>
                <TopBarComponent />
                <RecWrapper>
                    <RecContainer>
                        <RecTitle>여행지 탐색</RecTitle>
                        <RecSubTitle>
                            <p>처음 접하는 해외 여행에 어려움을 겪고 있을까요?</p>
                            <p>원하는 키워드를 선정해 맞춤형 여행 루트를 받아보세요.</p>
                        </RecSubTitle>
                        <RecBtnWrapper>
                            <RecBtn>
                                <p>루트 탐색</p>
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L10 9L1 17" stroke="black" stroke-width="2"/>
                                </svg>
                            </RecBtn>
                        </RecBtnWrapper>
                    </RecContainer>
                </RecWrapper>
                <BestWrapper>
                    <BestContainer>
                        <BestTitleWrapper>
                            <BestTitle>최근 BEST 여행 코스</BestTitle>
                        </BestTitleWrapper>
                        <BestCourseContainer>
                            <BestCourses>
                                {visibleAgents.map((review, index) => (
                                    <BestCourse key={index} review={review} />
                                ))}
                            </BestCourses>
                        </BestCourseContainer>
                    </BestContainer>
                </BestWrapper>
            </Wrapper>
        </>
    )
}