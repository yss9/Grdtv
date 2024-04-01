import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { animated, useSpring } from 'react-spring';

const SearchBar = () => {
    const [isExpanded, setExpanded] = useState(false);

    const expandAnimation = useSpring({
        width: isExpanded ? '200px' : '40px',
        opacity: isExpanded ? 1 : 0,
        borderRadius: isExpanded ? '20px' : '50%',
    });

    return (
        <div
            className="search-bar"
            style={{
                display: 'flex',
                alignItems: 'center',
                width: isExpanded ? '240px' : '80px',
                borderRadius: '20px',
                transition: 'width 0.3s ease',
                border: '2px solid black',
                position: 'relative',
            }}
        >
            <div
                className="search-icon"
                onClick={() => setExpanded(!isExpanded)}
                style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ccc',
                    marginRight: '-20px',
                }}
            >
                <FaSearch />
            </div>
            <animated.input
                type="text"
                className="search-input"
                placeholder="Search..."
                style={{
                    ...expandAnimation,
                    marginLeft: '5px',
                    borderRadius: '20px',
                    border: 'none',
                    padding: '10px',
                    outline: 'none',
                    position: 'absolute',
                    left: '40px',
                    width: isExpanded ? 'calc(100% - 45px)' : '0px',
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    );
};

export default SearchBar;
