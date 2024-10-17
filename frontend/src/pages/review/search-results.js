import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import TopBarComponent from "../../components/TopBar/TopBar";
import { Reset } from 'styled-reset';
import {Magnifier, Pin, Search, SearchBarContainer, SearchBarWrapper} from "./reviewstyle";

 const Blogs = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
     max-height: 61.5vh;
     overflow-y: scroll;
     &::-webkit-scrollbar {
         width: 8px; /* Width of the scrollbar */
     }

     &::-webkit-scrollbar-thumb {
         background-color: #ff9900; /* Color of the scrollbar thumb (the draggable part) */
         border-radius: 10px; /* Round the scrollbar edges */
     }

     &::-webkit-scrollbar-track {
         background-color: #f0f0f0; /* Background color of the scrollbar track */
     }
    //background-color: pink;
`
const LetKnow=styled.div`
    margin-top: 20px;
    width: 70%;
    height: 50px;
    align-items: center;
    font-family: Regular;
    font-size: 25px;
    display: flex;
    justify-content: flex-start;
`
const BlogContainer=styled.div`
    width: 90%;
  min-height: 18rem;
  background-color: white;
  margin-bottom: 40px;
  border-radius: 15px;
  border: 2px solid black;
  display: flex;
  justify-content: space-evenly;
`
const ContentWrapper = styled.div`
  width: 65%;
  height: 18rem;
  //background-color: #61dafb;
  border-radius: 15px 0 0 15px;
  // 스타일 정의
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Content=styled.div`
    width: 92%;
  height: 90%;
`
const Profile=styled.div`
 width: 60%;
 height: 30%;
  display: flex;
  align-items: center;
`;
const PImg=styled.img`
    width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #7d7d7d;
    object-fit: cover; /* 이미지를 가득 채우도록 설정 */

`;
const PContainer=styled.div`
    display: flex;
  flex-direction: column;
  width: 27vh;
  height: 100%;
  margin-left: 10px;
`;
const Pname=styled.div`
    width: 100%;
  height: 55%;
  //background-color: orchid;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #515151;
`;
const Pdate=styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  color: #9d9d9d;
`;
const Read=styled.div`
    width: 100%;
  height: 70%;
 // background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
`;
const ReadTitle=styled.div`
    width: 100%;
  height: 20%;
  //background-color: coral;
  font-size: 23px;
  color: #515151;
`
const ReadContent=styled.div`
    width: 100%;
  height: 62%;
 // background-color: #b4b4b4;
  font-size: 17px;
  padding: 7px;
  color: #515151;
`
const Icons=styled.div`
    width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
`
const Like =styled.div`
  color: #515151;
  font-size: 13px;
  display: flex;
`
const LikeIcon =styled.div`
 width: 2vh;
  height: 2vh;
 // background-color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Comment=styled.div`
  color: #515151;
  font-size: 13px;
  display: flex;
  margin-left: 10px;
`
const CommentIcon =styled.div`
 width: 2vh;
  height: 2vh;
 // background-color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BPicWrapper=styled.div`
 width: 30%;
 height: 18rem;
 border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BPic=styled.img`
    width: 12.5rem;
  height: 14.5rem;
  background-color: #8e8e8e;
  border: none;
  border-radius: 5px;
    object-fit: cover; /* 이미지를 가득 채우도록 설정 */
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');  // Get the search query from the URL
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [setReqData] = useState([]);


    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/search?query=${query}`);
                setSearchResults(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    const fetchLikes = (boardID) => {
        axios
            .get(`http://localhost:8080/api/likes/${boardID}/count`)
            .then((response) => {
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [boardID]: response.data.likesCount, // Store likes count per boardID
                }));
            })
            .catch((error) => {
                console.error(`Error fetching likes for post ${boardID}:`, error);
            });
    };

    const fetchComments = (boardID) => {
        axios
            .get(`http://localhost:8080/api/comments/${boardID}/count`)
            .then((response) => {
                setComments((prevComments) => ({
                    ...prevComments,
                    [boardID]: response.data, // response.data에 바로 숫자가 담겨 있는 경우
                }));
            })
            .catch((error) => {
                console.error(`Error fetching comments for post ${boardID}:`, error);
            });
    };

    useEffect(() => {
        if (searchResults.length > 0) {
            searchResults.forEach((post) => {
                fetchLikes(post.boardID); // 각 게시글에 대해 좋아요 수 가져오기
                fetchComments(post.boardID); // 각 게시글에 대해 댓글 수 가져오기
            });
        }
    }, [searchResults]);

    const onClickMoveToBoardDetail = (id) => {
        navigate(`/board/${id}`);
        console.log(id);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // 'YYYY-MM-DD' 형식으로 변환
    };


    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== "") {
            fetchData(searchQuery); // Fetch data using the new endpoint
            navigate(`/search-results?query=${searchQuery}`); // Redirect to search results page
        }
    };

    const fetchData = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/search?query=${query}`);
            setReqData(response.data); // Set the retrieved data
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            // 검색 결과 페이지로 이동, 검색어 전달
            navigate(`/search-results?query=${searchQuery}`);
        }
    };

    return (
        <>
            <Reset/>
            <div style={{height: '55px'}}></div>
            <TopBarComponent/>
            <Wrapper>
                <SearchBarWrapper>
                    <SearchBarContainer>
                        <Pin>
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.8348 15.725C15.7138 15.725 14.6387 15.3167 13.8461 14.59C13.0534 13.8633 12.6081 12.8777 12.6081 11.85C12.6081 10.8223 13.0534 9.83666 13.8461 9.10996C14.6387 8.38326 15.7138 7.975 16.8348 7.975C17.9558 7.975 19.0309 8.38326 19.8236 9.10996C20.6162 9.83666 21.0615 10.8223 21.0615 11.85C21.0615 12.3589 20.9522 12.8628 20.7398 13.3329C20.5274 13.803 20.2161 14.2302 19.8236 14.59C19.4311 14.9499 18.9651 15.2353 18.4523 15.43C17.9395 15.6248 17.3899 15.725 16.8348 15.725ZM16.8348 1C13.696 1 10.6858 2.14312 8.46634 4.17789C6.24688 6.21266 5 8.9724 5 11.85C5 19.9875 16.8348 32 16.8348 32C16.8348 32 28.6696 19.9875 28.6696 11.85C28.6696 8.9724 27.4228 6.21266 25.2033 4.17789C22.9838 2.14312 19.9736 1 16.8348 1Z"
                                    fill="#4E53EE"/>
                            </svg>
                        </Pin>
                        <Search
                            value={searchQuery}
                            placeholder="지역을 입력하세요"
                            onChange={(e) => setSearchQuery(e.target.value)} // 여기에 onChange 핸들러 추가
                            onKeyPress={handleKeyPress}
                        />

                        <Magnifier onClick={handleSearchSubmit}>
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24.9 27L15.45 17.55C14.7 18.15 13.8375 18.625 12.8625 18.975C11.8875 19.325 10.85 19.5 9.75 19.5C7.025 19.5 4.719 18.556 2.832 16.668C0.945001 14.78 0.00100079 12.474 7.93651e-07 9.75C-0.000999206 7.026 0.943001 4.72 2.832 2.832C4.721 0.944 7.027 0 9.75 0C12.473 0 14.7795 0.944 16.6695 2.832C18.5595 4.72 19.503 7.026 19.5 9.75C19.5 10.85 19.325 11.8875 18.975 12.8625C18.625 13.8375 18.15 14.7 17.55 15.45L27 24.9L24.9 27ZM9.75 16.5C11.625 16.5 13.219 15.844 14.532 14.532C15.845 13.22 16.501 11.626 16.5 9.75C16.499 7.874 15.843 6.2805 14.532 4.9695C13.221 3.6585 11.627 3.002 9.75 3C7.873 2.998 6.2795 3.6545 4.9695 4.9695C3.6595 6.2845 3.003 7.878 3 9.75C2.997 11.622 3.6535 13.216 4.9695 14.532C6.2855 15.848 7.879 16.504 9.75 16.5Z"
                                    fill="#4E53EE"/>
                            </svg>
                        </Magnifier>
                    </SearchBarContainer>
                </SearchBarWrapper>
                <LetKnow><p>"{query}"에 대한 검색결과</p></LetKnow>
                <Blogs>
                    {searchResults.length > 0 ? (
                        searchResults.map((post) => (
                            <BlogContainer key={post.boardID} onClick={() => onClickMoveToBoardDetail(post.boardID)}>
                                <ContentWrapper>
                                    <Content>
                                        <Profile>
                                            <PImg></PImg>
                                            <PContainer>
                                                <Pname>{post.nickname}</Pname>
                                                <Pdate>{formatDate(post.createDate)}</Pdate>
                                            </PContainer>
                                        </Profile>
                                        <Read>
                                            <ReadTitle>{post.title}</ReadTitle>
                                            <ReadContent></ReadContent>
                                            <Icons>
                                                <Like>
                                                    <LikeIcon>
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.5 14L6.5575 13.0649C3.21 9.7564 1 7.5673 1 4.89646C1 2.70736 2.573 1 4.575 1C5.706 1 6.7915 1.57384 7.5 2.47357C8.2085 1.57384 9.294 1 10.425 1C12.427 1 14 2.70736 14 4.89646C14 7.5673 11.79 9.7564 8.4425 13.0649L7.5 14Z"
                                                                fill="#DD3F3F"/>
                                                        </svg>
                                                    </LikeIcon>
                                                    공감{likes[post.boardID] || 0}</Like>
                                                <Comment>
                                                    <CommentIcon>
                                                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 1.56891V8.74154C0 9.60772 0.734238 10.3104 1.64072 10.3104H9.03235L11.6298 13V10.3102H13.3593C14.2653 10.3102 15 9.60748 15 8.7413V1.56891C14.9998 0.702482 14.2653 0 13.3593 0H1.64072C0.734238 0 0 0.702482 0 1.56891ZM10.4483 5.15498C10.4483 4.59815 10.9203 4.14652 11.5031 4.14652C12.0858 4.14652 12.5578 4.59815 12.5578 5.15498C12.5578 5.7123 12.0858 6.16369 11.5031 6.16369C10.9203 6.16369 10.4483 5.71254 10.4483 5.15498ZM6.44514 5.15498C6.44514 4.59815 6.91763 4.14652 7.49988 4.14652C8.08212 4.14652 8.55461 4.59815 8.55461 5.15498C8.55461 5.7123 8.08212 6.16369 7.49988 6.16369C6.91763 6.16369 6.44514 5.71254 6.44514 5.15498ZM2.44221 5.15498C2.44221 4.59815 2.9147 4.14652 3.49694 4.14652C4.07968 4.14652 4.55167 4.59815 4.55167 5.15498C4.55167 5.7123 4.07968 6.16369 3.49694 6.16369C2.91445 6.16393 2.44221 5.71254 2.44221 5.15498Z"
                                                                fill="black"/>
                                                        </svg>
                                                    </CommentIcon>
                                                    댓글 {comments[post.boardID] || 0}</Comment>
                                            </Icons>
                                        </Read>
                                    </Content>
                                </ContentWrapper>
                                <BPicWrapper>
                                    <BPic></BPic>
                                </BPicWrapper>
                            </BlogContainer>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </Blogs>
            </Wrapper>
        </>
    );
};

export default SearchResults;
