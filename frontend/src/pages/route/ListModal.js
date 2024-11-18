import React, {useEffect, useState} from 'react';
import {ModalWrapper} from './modalstyle';
import {ListModalContent, ListRecListItem, List, ListModalCloseButton} from "./routestyle";
import Papa from "papaparse";

const ListModal = ({ isOpen, onClose }) => {

    const [data, setData] = useState([]);



    useEffect(() => {
        // CSV 파일 경로
        const csvFilePath = '/data/country_codes.csv';

        // CSV 데이터 읽기
        Papa.parse(csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                setData(result.data); // 데이터 저장
            },
        });
    }, []);


    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ListModalContent>
                <ListModalCloseButton onClick={onClose}>
                    <svg width="30" height="30" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="36.5" cy="36.5" r="36.5" fill="#FF9900"/>
                        <path d="M22 23L51 52" stroke="white" strokeWidth="10" strokeLinecap="round"/>
                        <path d="M51 23L22 52" stroke="white" strokeWidth="10" strokeLinecap="round"/>
                    </svg>
                </ListModalCloseButton>
                <List>
                    {data.map((row, index) => (
                        <ListRecListItem key={index}>
                            {row.Country}
                        </ListRecListItem>
                    ))}
                </List>

            </ListModalContent>
        </ModalWrapper>
    );
};

export default ListModal;
