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

    const [images, setImages] = useState([]);
    const API_KEY = "47165648-3e0e88f77d1c43665cfb58d64";

    useEffect(() => {
        // Pixabay API 호출
        const fetchImages = async () => {
            try {
                const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${country}&image_type=photo`;
                const response = await axios.get(API_URL);
                if (response.data.hits.length > 1) {
                    // 로열티 없는 첫 번째 이미지 바로 아래의 이미지 가져오기
                    setImages(response.data.hits[1]);
                } else {
                    console.log("이미지를 충분히 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("이미지 로드 중 오류 발생:", error);
            }
        };

        fetchImages();
    }, [isOpen]);

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

                <p onClick={onClose} style={{
                    cursor: 'pointer',
                    position: "relative",
                    top: 0,
                    left: '100%',
                    fontSize: "30px",
                    color: "#C7C7C7"
                }}>x</p>
                <div style={{width: '60%', height: 'auto', float: 'left', marginTop: "3%"}}>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <ModalSubtitle>{countryEng}</ModalSubtitle>
                    <ModalTitle>{country}</ModalTitle>

                    <ModalText>
                        <div dangerouslySetInnerHTML={{__html: extractHtml}}/>
                    </ModalText>
                </div>
                <ModalImage src={images.webformatURL} alt={images.tags}/>
                <MakeRouteButton onClick={onClickMakeRouteButton}>일정 만들기 &nbsp;&nbsp;&gt;</MakeRouteButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
