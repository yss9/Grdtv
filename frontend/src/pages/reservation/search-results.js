import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Agent from "../../components/Agent/Agent";
import Profile from '../../images/도라에몽.jpeg';
import {Magnifier, Pin, Search, SearchBarContainer, SearchBarWrapper} from "../review/reviewstyle";
import { Reset } from "styled-reset";
import TopBarComponent from "../../components/TopBar/TopBar"; // Make sure to import Reset if you're using it
import styled  from "@emotion/styled";

const SearchResult = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Create a grid with up to 3 columns */
    gap: 16px; /* Space between grid items */
    max-height:66vh;
    overflow-y: scroll;
    padding: 16px;
    width: 1300px;
    margin-top: 10px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ff9900;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f0f0f0;
    }
`;

export default function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // For navigating with a new search term

    // Get the initial search term from URL params
    const hashtag = searchParams.get("hashtag") || "";
    const [searchQuery, setSearchQuery] = useState(hashtag.replace("#", "")); // Initialize searchQuery with the current hashtag

    // Fetch results whenever the hashtag changes
    useEffect(() => {
        if (hashtag) {
            axios
                .get(`http://localhost:8080/api/users/search-agents-by-hashtag`, {
                    params: { hashtag: `#${hashtag}` },
                })
                .then((response) => {
                    setSearchResults(response.data);  // Set the fetched data to display
                    setError(null); // Clear any existing error
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                    setError("Error fetching search results"); // Set error message
                });
        }
    }, [hashtag]);

    // Update search query as the user types
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle pressing Enter in the search field
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    // Handle clicking the search button or pressing Enter
    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            // Navigate to the same page with the new search query as a URL parameter
            navigate(`/search-resultsforglopler?hashtag=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <Reset/>
            <div style={{height: '55px'}}></div>
            <TopBarComponent/>
            <SearchBarWrapper>
                <SearchBarContainer>
                    <Pin>
                        <svg width="30" height="30" viewBox="0 0 32 32" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_74_14)">
                                <path
                                    d="M14.2222 32V21.3333H17.7778V24.8889H32V28.4444H17.7778V32H14.2222ZM0 28.4444V24.8889H10.6667V28.4444H0ZM7.11111 21.3333V17.7778H0V14.2222H7.11111V10.6667H10.6667V21.3333H7.11111ZM14.2222 17.7778V14.2222H32V17.7778H14.2222ZM21.3333 10.6667V0H24.8889V3.55556H32V7.11111H24.8889V10.6667H21.3333ZM0 7.11111V3.55556H17.7778V7.11111H0Z"
                                    fill="#5F6368"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_74_14">
                                    <rect width="32" height="32" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </Pin>
                    <Search
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="여행 관련 키워드를 검색해보세요."
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
            <div style={{display:'flex', justifyContent:'center'}}>
                <SearchResult>
                    {error && <p>{error}</p>}
                    {searchResults.length > 0 ? (
                        searchResults.map((agent, index) => (
                            <Agent key={index} review={{
                                author: agent.nickname,
                                introduce: agent.introduction,
                                hashtags: agent.hashtags || [],
                                spec: agent.specIntroduction || [],
                                image: agent.profilePicture
                                    ? `http://localhost:8080/${agent.profilePicture.replace('static\\', '').replace(/\\/g, '/')}`
                                    : Profile,
                                score: agent.averageReviewRating,
                            }}/>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </SearchResult>
            </div>
        </>
    );
}
