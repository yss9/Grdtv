import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, notification } from 'antd'; // Import notification from antd
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./style";
import TopBarComponent from "../../../components/TopBar/TopBar";
import { Avatar, AvatarWrapper } from "./style";
import MapComponent from "./MapComponent";
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import parse from 'html-react-parser';

import BoardCommentWrite from "../../reviewComment/write/write";
import BoardCommentList from "../../reviewComment/list/list";
import {Reset} from "styled-reset";


export default function BoardDetail() {
    const { boardID } = useParams();
    const navigate = useNavigate();

    //게시글
    const [title, setTitle] = useState("");
    const [addressTitle, setAddressTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [createDate, setCreateDate] = useState("");

    //좋아요
    const [isLiked, setIsLiked] = useState(false);  // 좋아요 상태
    const [likesCount, setLikesCount] = useState(0); // 좋아요 수

    //사용자 정보
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null); // 사용자 데이터를 저장할 상태
    const [showWriteComment, setShowWriteComment] = useState(false); // 댓글 작성 모드 상태
    const [postOwnerId, setPostOwnerId] = useState(0); // 게시글 작성자의 ID
    const [userId, setUserId] = useState(0); // 로그인한 사용자의 ID

    /**
     * 찬호 - 쿠키에서 JWT 토큰 가져오기
     */
    const token = Cookies.get('jwt');


    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                // console.log("userPayload:", userPayload);
                const extractedUsername = userPayload.nickname;
                setUsername(extractedUsername);
                console.log("username: ", username);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${boardID}/`);
            const postData = response.data;

            console.log('Fetched data:', postData); // 데이터를 확인하는 콘솔 로그

            setTitle(postData.title);
            setAddressTitle(postData.addressTitle); // 주소 제목 설정
            setBody(postData.body);
            setImage(postData.image);
            setNickname(postData.nickname); // 닉네임 설정
            setPostOwnerId(postData.userId); // 게시글 작성자의 ID 설정
            setProfile(postData.profilePicture); // 사용자 프로필 설정

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
        const fetchUserData = async () => {
            try {
                if (token) {
                    // 토큰에서 사용자 아이디 추출
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;  // 'id' 필드에서 userId 추출

                    const response = await axios.get(`http://localhost:8080/api/users/my-info?userId=${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                } else {
                    console.error('No JWT token found in cookies');
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, [token]);



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

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const id = decodedToken.id;

                // 서버에서 현재 유저의 좋아요 상태와 좋아요 수 가져오기
                const response = await axios.get(`http://localhost:8080/api/likes/${boardID}/is-liked?id=${id}`);

                setIsLiked(response.data.isLiked);   // 좋아요 여부 설정
                setLikesCount(response.data.likesCount);  // 좋아요 수 설정
            } catch (error) {
                console.error('Failed to fetch like status', error);
            }
        };

        if (token) {
            fetchLikeStatus();
        }
    }, [boardID, token]);

    const handleLikeClick = async () => {
        if (!token) {
            notification.error({
                message: '로그인 필요',
                description: '좋아요를 누르려면 로그인해주세요.'
            });
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const id = decodedToken.id;

            const response = await axios.post(`http://localhost:8080/api/likes/toggle?boardID=${boardID}&id=${id}`);

            setIsLiked(response.data.isLiked);
            setLikesCount(response.data.likesCount);
        } catch (error) {
            console.error('Error toggling like:', error);
            notification.error({
                message: '좋아요 처리 실패',
                description: '좋아요 상태를 업데이트하는 데 실패했습니다.'
            });
        }
    };


    const handleCommentToggle = () => {
        if (!token) {
            notification.error({
                message: '로그인 필요',
                description: '댓글을 작성하려면 로그인해주세요.'
            });
            return;
        }
        setShowWriteComment(!showWriteComment);
    };




    let bodyParsed = parse(body, {
        replace: (domNode) => {
            if (domNode.name === 'img') {
                // img 태그를 찾아서 스타일 속성 추가
                return (
                    <img
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt || ''}
                        style={{ width: '500px', height: '500px' }}
                    />
                );
            }
        }
    });

    return (
        <>
            <Reset />
            <div style={{height:"60px"}}>

            </div>
            <TopBarComponent/>
            <S.Container>
                <S.Wrapper>
                    <S.CardWrapper>
                        <S.Header>
                            <S.Info>
                                <S.TitleWrapper>
                                    <S.Title>{title}</S.Title>
                                </S.TitleWrapper>
                                <AvatarWrapper>
                                    <Avatar
                                        src={profile ? `http://localhost:8080/${profile.replace('static/', '')}` : 'http://localhost:8080/image/no_image.png'}
                                    />

                                    <S.Writer>{nickname}</S.Writer>
                                </AvatarWrapper>
                                <S.Date>{formatCreateDate(createDate)}</S.Date>
                            </S.Info>
                            <S.SubWrapper>
                                <S.Url onClick={handleCopyUrl}>Url 복사</S.Url>
                                <S.Favorite onClick={handleLikeClick}>
                                    {isLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                                    <span>{likesCount}</span> {/* 좋아요 수 표시 */}
                                </S.Favorite>
                            </S.SubWrapper>
                        </S.Header>
                        <S.Body>
                            <S.RouteTitle>{nickname} 님의 "{addressTitle}"</S.RouteTitle> {/* Render addressTitle here */}
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
                            {/*<S.Contents>{body}</S.Contents>*/}
                            {bodyParsed}
                            <S.ImageWrapper>
                                {image && <img src={`http://localhost:8080/${image.replace('src/main/resources/static/', '')}`} alt="Post Image" style={{ width: '100px', height: '100px' }}  />}
                            </S.ImageWrapper>
                        </S.Body>
                    </S.CardWrapper>
                    {/* 작성자와 토큰 내의 사용자 이름이 같을 경우 수정 및 삭제 버튼 표시 */}

                    <S.BottomWrapper>
                        {username === nickname && (
                            <div>
                                <Button
                                    onClick={() => {
                                        // state 전달 시 콘솔로 확인
                                        console.log("Navigating with state:", { title, addressTitle, body, image, addresses });
                                        navigate(`/board/${boardID}/edit`, {
                                            state: { title, addressTitle, body, image, addresses }
                                        });
                                    }}
                                    style={{ background: '#4E53EE', color: 'white' }}
                                >
                                    수정하기
                                </Button>

                                <Button onClick={onClickBoardDelete} style={{ background: '#4E53EE', color: 'white' }}>
                                    삭제하기
                                </Button>
                            </div>
                        )}
                        <Button
                            onClick={() => navigate(`/review`)}
                            style={{ background: '#4E53EE', color: 'white' }}
                        >
                            목록보기
                        </Button>

                    </S.BottomWrapper>


                    <div>
                        <Button onClick={handleCommentToggle}>
                            {showWriteComment ? '댓글 목록 보기' : '댓글 작성하기'}
                        </Button>
                        {showWriteComment ? (
                            <BoardCommentWrite boardID={boardID} />
                        ) : (
                            <BoardCommentList />
                        )}
                    </div>

                </S.Wrapper>
            </S.Container>
        </>
    );
}
