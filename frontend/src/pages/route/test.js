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
import { load } from 'cheerio';
import axios from "axios";

export default function RoutePage() {
    const [extractHtml, setExtractHtml] = useState(''); // extractHtml만 상태로 유지
    const country = '가나'; // 로컬 변수로 선언

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://ko.wikipedia.org/api/rest_v1/page/summary/${country}`
                );
                setExtractHtml(response.data.extract_html);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchData();
    }, [country]);

    return (
        <div>
            <h2>{country}</h2>
            <div dangerouslySetInnerHTML={{ __html: extractHtml }} />
        </div>
    );
}
