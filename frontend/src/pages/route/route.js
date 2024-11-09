import { Wrapper } from "../review/reviewstyle";
import { Reset } from 'styled-reset';
import React, { useState, useEffect } from "react";
import {
    RecBtnWrapper, RecContainer, RecSubTitle,
    RecTitle, RecWrapper, RecInput, RecList, RecListItem, RecListCountry,
} from "./routestyle";
import TopBarComponent from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Papa from 'papaparse';

export default function RoutePage() {
    const [showModal, setShowModal] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        // Load CSV file
        const fetchCSVData = async () => {
            Papa.parse('./countries.csv', {
                download: true,
                header: true,
                complete: (result) => {
                    const data = result.data.map(item => ({
                        country: item['나라'],
                        name: item['도시명']
                    })).filter(item => item.country && item.name);

                    setDestinations(data);
                },
                error: (error) => {
                    console.error('Error loading CSV file:', error);
                }
            });
        };

        fetchCSVData();
    }, []);

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Reset />
            <Wrapper>
                <div style={{ height: '55px' }}></div>
                <TopBarComponent />
                <RecWrapper>
                    <RecContainer>
                        <RecTitle>여행지 탐색</RecTitle>
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
                                <p style={{ fontFamily: "SubTitle", fontSize: "12px", paddingBottom: "10px" }}>목록에서 찾아보기</p>
                                <RecList>
                                    {filteredDestinations.map((destination, index) => (
                                        <RecListItem key={index} onClick={openModal}>
                                            {destination.name}
                                            <RecListCountry>{destination.country}</RecListCountry>
                                        </RecListItem>
                                    ))}
                                </RecList>
                            </div>
                        </RecBtnWrapper>
                    </RecContainer>
                </RecWrapper>
                <Modal isOpen={showModal} onClose={closeModal} />
            </Wrapper>
        </>
    );
}
