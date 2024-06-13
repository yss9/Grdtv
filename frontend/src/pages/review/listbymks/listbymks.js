import { Reset } from "styled-reset";
import TopBarComponent from "../../../components/TopBar/TopBar";
import React, { useState } from "react";
import Blog1 from "../../../components/reviewPage/Blog1/Blog1";
import styled from "@emotion/styled";

const BlogData = [
    // USA Reviews
    { title: 'Review USA 1', content: 'This is the first blog from USA', author: 'Author USA 1', country: 'usa' },
    { title: 'Review USA 2', content: 'This is the second blog from USA', author: 'Author USA 2', country: 'usa' },
    { title: 'Review USA 3', content: 'This is the third blog from USA', author: 'Author USA 3', country: 'usa' },
    { title: 'Review USA 4', content: 'This is the first blog from USA', author: 'Author USA 4', country: 'usa' },
    { title: 'Review USA 5', content: 'This is the second blog from USA', author: 'Author USA 5', country: 'usa' },
    { title: 'Review USA 6', content: 'This is the third blog from USA', author: 'Author USA 6', country: 'usa' },
    // Canada Reviews
    { title: 'Review Canada 1', content: 'This is the first blog from Canada', author: 'Author Canada 1', country: 'canada' },
    { title: 'Review Canada 2', content: 'This is the second blog from Canada', author: 'Author Canada 2', country: 'canada' },
    { title: 'Review Canada 3', content: 'This is the third blog from Canada', author: 'Author Canada 3', country: 'canada' },
    // UK Reviews
    { title: 'Review UK 1', content: 'This is the first blog from UK', author: 'Author UK 1', country: 'uk' },
    { title: 'Review UK 2', content: 'This is the second blog from UK', author: 'Author UK 2', country: 'uk' },
    { title: 'Review UK 3', content: 'This is the third blog from UK', author: 'Author UK 3', country: 'uk' },
    // Italy Reviews
    { title: 'Review Italy 1', content: 'This is the first blog from Italy', author: 'Author Italy 1', country: 'italy' },
    { title: 'Review Italy 2', content: 'This is the second blog from Italy', author: 'Author Italy 2', country: 'italy' },
    { title: 'Review Italy 3', content: 'This is the third blog from Italy', author: 'Author Italy 3', country: 'italy' },
    // France Reviews
    { title: 'Review France 1', content: 'This is the first blog from France', author: 'Author France 1', country: 'france' },
    { title: 'Review France 2', content: 'This is the second blog from France', author: 'Author France 2', country: 'france' },
    { title: 'Review France 3', content: 'This is the third blog from France', author: 'Author France 3', country: 'france' },
    // Japan Reviews
    { title: 'Review Japan 1', content: 'This is the first blog from Japan', author: 'Author Japan 1', country: 'japan' },
    { title: 'Review Japan 2', content: 'This is the second blog from Japan', author: 'Author Japan 2', country: 'japan' },
    { title: 'Review Japan 3', content: 'This is the third blog from Japan', author: 'Author Japan 3', country: 'japan' },
    // China Reviews
    { title: 'Review China 1', content: 'This is the first blog from China', author: 'Author China 1', country: 'china' },
    { title: 'Review China 2', content: 'This is the second blog from China', author: 'Author China 2', country: 'china' },
    { title: 'Review China 3', content: 'This is the third blog from China', author: 'Author China 3', country: 'china' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Blogs = styled.div`
  margin-top: 3rem;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const SelectContainer = styled.div`
  margin-left: 60rem;
  display: flex;
  align-items: center;
  margin-top: 3rem;
`;

const Select = styled.select`
  width: 170px;
  height: 100%;
  background-color: #d9d9d9;
  border: none;
  padding: 15px;
  font-family: "Regular";
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PageNumber = styled.button`
  background-color: ${props => (props.active ? "#4e53ed" : "#d9d9d9")};
  color: ${props => (props.active ? "#fff" : "#000")};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-family: "Regular";
`;

const ITEMS_PER_PAGE = 3;

export default function ReviewListPage() {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setCurrentPage(1); // Reset to first page on country change
    };

    const filteredBlogs = BlogData.filter(blog =>
        selectedCountry === "" || blog.country === selectedCountry
    );

    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const displayedBlogs = filteredBlogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Container>
                <SelectContainer>
                    <Select value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Select a country</option>
                        <optgroup label="America">
                            <option value="usa">USA</option>
                            <option value="canada">Canada</option>
                        </optgroup>
                        <optgroup label="Europe">
                            <option value="uk">UK</option>
                            <option value="italy">Italy</option>
                            <option value="france">France</option>
                        </optgroup>
                        <optgroup label="Asia">
                            <option value="japan">Japan</option>
                            <option value="china">China</option>
                        </optgroup>
                    </Select>
                </SelectContainer>
                <Blogs>
                    {displayedBlogs.map((blog, index) => (
                        <Blog1 key={index} review={blog} />
                    ))}
                </Blogs>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PageNumber
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </PageNumber>
                    ))}
                </Pagination>
            </Container>
        </>
    );
}
