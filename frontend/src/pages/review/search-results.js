import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');  // Get the search query from the URL

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts?query=${query}`);
                setSearchResults(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {searchResults.length > 0 ? (
                searchResults.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.author}</p>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default SearchResults;
