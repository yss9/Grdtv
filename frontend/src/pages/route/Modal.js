import React, {useEffect, useState} from 'react';
import {
    ModalWrapper, ModalContent, ModalImage, ModalTitle, ModalSubtitle, ModalText, CloseButton, MakeRouteButton
} from './modalstyle';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Modal = ({ country, countryEng, code, isOpen, onClose }) => {
    const navigate = useNavigate();

    const [extractHtml, setExtractHtml] = useState(''); // extractHtml만 상태로 유지

    const onClickMakeRouteButton = () => {
        localStorage.setItem("country", country);
        localStorage.setItem("code", code);
        navigate('/routeNavigation');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://ko.wikipedia.org/api/rest_v1/page/summary/${country}`
                );

                // 데이터 제한: 600자까지만 저장
                const truncatedExtractHtml = response.data.extract_html.substring(0, 600);
                setExtractHtml(truncatedExtractHtml);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchData();
    }, [country]);


    if (!isOpen) return null;
    return (
        <ModalWrapper>
            <ModalContent>
                <p onClick={onClose} style={{cursor:'pointer', position:"relative", top:0, left:'100%', fontSize:"30px",color:"#C7C7C7"}}>x</p>
                <div style={{width: '60%', height: 'auto', float: 'left', marginTop: "3%"}}>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <ModalSubtitle>{countryEng}</ModalSubtitle>
                    <ModalTitle>{country}</ModalTitle>

                    <ModalText>
                        <div dangerouslySetInnerHTML={{__html: extractHtml}}/>
                    </ModalText>
                </div>
                <ModalImage src="/Img/오사카 이미지.png" alt="오사카 이미지"/>
                <MakeRouteButton onClick={onClickMakeRouteButton}>일정 만들기 &nbsp;&nbsp;&gt;</MakeRouteButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
