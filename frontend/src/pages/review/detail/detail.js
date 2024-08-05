import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, notification } from 'antd'; // Import notification from antd
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./style";
import TopBarComponent from "../../../components/TopBar/TopBar";
import { Avatar, AvatarWrapper } from "./style";
import MapComponent from "./MapComponent";
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export default function BoardDetail() {
    const { boardID } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [addressTitle, setAddressTitle] = useState(""); // Address title state
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [createDate, setCreateDate] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${boardID}/`);
            const postData = response.data;

            console.log('Fetched data:', postData); // 데이터를 확인하는 콘솔 로그

            setTitle(postData.title);
            setAddressTitle(postData.addressTitle); // 주소 제목 설정
            setBody(postData.body);
            setImage(postData.image);

            // Process addresses to remove any unwanted characters
            const processedAddresses = postData.addresses.map(address => {
                const cleanedAddress = address.address.replace(/[\[\]"]/g, '').trim();
                return {
                    ...address,
                    address: cleanedAddress
                };
            });

            console.log('Processed addresses:', processedAddresses); // 처리된 주소 데이터 확인
            setAddresses(processedAddresses);
            setCreateDate(postData.createDate);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [boardID]);

    const formatCreateDate = (dateString) => {
        if (!dateString) return '';

        try {
            const zonedDate = toZonedTime(dateString, 'Asia/Seoul');
            return formatInTimeZone(zonedDate, 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    const onClickBoardDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${boardID}/`);
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            navigate("/review");
        } catch (error) {
            console.log(error);
        }
    };

    const handleCopyUrl = () => {
        const url = window.location.href; // Get the current page URL

        navigator.clipboard.writeText(url).then(() => {
            notification.success({
                message: 'URL 복사 완료',
                description: 'URL이 클립보드에 복사되었습니다.'
            });
        }).catch((error) => {
            notification.error({
                message: 'URL 복사 실패',
                description: 'URL을 클립보드에 복사하는 데 실패했습니다.'
            });
            console.error('Failed to copy URL:', error);
        });
    };

    return (
        <>
            <TopBarComponent />
            <S.Container>
                <S.Wrapper>
                    <S.CardWrapper>
                        <S.Header>
                            <S.Info>
                                <S.TitleWrapper>
                                    <S.Title>{title}</S.Title>
                                </S.TitleWrapper>
                                <AvatarWrapper>
                                    <Avatar />
                                    <S.Writer>사용자1</S.Writer>
                                </AvatarWrapper>
                                <S.Date>{formatCreateDate(createDate)}</S.Date>
                            </S.Info>
                            <S.SubWrapper>
                                <S.Url onClick={handleCopyUrl}>Url 복사</S.Url>
                                <S.Favorite>favorite</S.Favorite>
                            </S.SubWrapper>
                        </S.Header>
                        <S.Body>
                            <S.RouteTitle>사용자1 님의 "{addressTitle}"</S.RouteTitle> {/* Render addressTitle here */}
                            <S.AddressWrapper>
                                {addresses.map((address, index) => (
                                    <S.AddressItem key={index}>
                                        <S.AddressIndex>{index + 1}</S.AddressIndex>
                                        <S.Address>{address.address}</S.Address>
                                    </S.AddressItem>
                                ))}
                            </S.AddressWrapper>
                            <S.MapWrapper>
                                <MapComponent addresses={addresses} />
                            </S.MapWrapper>
                            <S.Contents>{body}</S.Contents>
                            <S.ImageWrapper>
                                {image && <img src={`http://localhost:8080/${image.replace('src/main/resources/static/', '')}`} alt="Post Image" style={{ width: '100%' }} />}
                            </S.ImageWrapper>
                        </S.Body>
                    </S.CardWrapper>
                    <S.BottomWrapper>
                        <Button onClick={() => navigate("/review")}>목록으로</Button>
                        <Button onClick={() => navigate(`/board/${boardID}/edit`)}>수정하기</Button>
                        <Button onClick={onClickBoardDelete}>삭제하기</Button>
                    </S.BottomWrapper>
                </S.Wrapper>
            </S.Container>
        </>
    );
}
