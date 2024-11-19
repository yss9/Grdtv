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
import axios from "axios";

export default function RoutePage() {
    const [images, setImages] = useState([]);
    const API_KEY = "47165648-3e0e88f77d1c43665cfb58d64";
    const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=태국&image_type=photo`;

    useEffect(() => {
        // Pixabay API 호출
        const fetchImages = async () => {
            try {
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
    }, []);

    return (
        <div>
            <h1>태국 이미지</h1>
            {images ? (
                <img src={images.webformatURL} alt={images.tags} />
            ) : (
                <p>이미지를 가져오는 중...</p>
            )}
        </div>
    );
}
