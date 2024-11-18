import { Wrapper } from "../review/reviewstyle";
import { Reset } from "styled-reset";
import React, { useState, useEffect } from "react";
import {
    RecBtnWrapper,
    RecContainer,
    RecSubTitle,
    RecTitle,
    RecWrapper,
    RecInput,
    RecList,
    RecListItem,
    RecListCountry,
} from "./routestyle";
import TopBarComponent from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Papa from "papaparse";
import ListModal from "./ListModal";

export default function RoutePage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 저장할 상태
    const [showListModal, setShowListModal] = useState(false);
    const [country, setCountry] = useState('');
    const [countryEng, setCountryEng] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        // CSV 파일 경로
        const csvFilePath = "/data/country_codes.csv";

        // CSV 데이터 읽기
        Papa.parse(csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                setData(result.data); // 데이터 저장
                setFilteredData(result.data); // 초기에는 전체 데이터를 표시
            },
        });
    }, []);

    useEffect(() => {
        // 검색어에 따라 데이터를 필터링
        const filtered = data.filter((row) =>
            row.Country.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const openModal = (row) => {
        setCountry(row.Country);
        setCountryEng(row.CountryEng);
        setCode(row.Code);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowListModal(false);
    };

    const handleViewList = () => {
        setShowListModal(true);
    };

    return (
        <>
            <Reset />
            <Wrapper>
                <div style={{ height: "55px" }}></div>
                <TopBarComponent />
                <RecWrapper>
                    <RecContainer>
                        <RecTitle>여행지 정보</RecTitle>
                        <RecSubTitle>
                            <p>처음 접하는 해외 여행에 어려움을 겪고 있을까요?</p>
                            <p>원하는 키워드를 선정해 맞춤형 여행 루트를 받아보세요.</p>
                        </RecSubTitle>
                        <RecBtnWrapper>
                            <div>
                                <RecInput
                                    placeholder="어디로 여행을 떠나시나요?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <p
                                    onClick={handleViewList}
                                    style={{
                                        fontFamily: "SubTitle",
                                        fontSize: "12px",
                                        paddingBottom: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    목록에서 찾아보기
                                </p>
                                <RecList>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row, index) => (
                                            <RecListItem key={index} onClick={() => openModal(row)}>
                                                {row.Country}
                                                <RecListCountry>{row.CountryEng}</RecListCountry>

                                            </RecListItem>
                                        ))
                                    ) : (
                                        <p style={{ fontSize: "12px", color: "gray" }}>
                                            검색 결과가 없습니다.
                                        </p>
                                    )}
                                </RecList>
                            </div>
                        </RecBtnWrapper>
                    </RecContainer>
                </RecWrapper>
                <ListModal isOpen={showListModal} onClose={closeModal} />
                <Modal country={country} countryEng={countryEng} code={code} isOpen={showModal} onClose={closeModal} />
            </Wrapper>
        </>
    );
}
