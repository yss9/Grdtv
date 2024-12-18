/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import * as S from "./style";
import {Modal, Tooltip} from 'antd';
import {Link, useNavigate, useParams} from "react-router-dom";
import TopBarComponent from "../../../components/TopBar/TopBar";
import MapComponent from "./MapComponent";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 퀼 에디터의 기본 스타일시트를 가져옵니다.
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuillEditor from "../../../components/Editor/QuillEditor";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";



export default function BoardWrite(props) {
    const navigate = useNavigate();


    // User 닉네임 가져옴
    const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기

    const [userId, setUserId] = useState("")
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState("");
    const [addressTitle, setAddressTitle] = useState(""); // 경로 제목 상태 추가
    const [addresses, setAddresses] = useState([{ address: "", location: { lat: null, lng: null } }]);
    const [country, setCountry] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
    const quillRef = useRef(null); // ReactQuill ref

    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태 추가
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { boardID } = useParams();

    console.log("boardID를 찍어보섿ㄱ다:",boardID)


    const handleModalClose = () => {
        setIsModalVisible(false);
        setModalMessage("");
    };

    const isFormValid = title && body && country && addressTitle && addresses.every(address => address.address);

    useEffect(() => {
        if (props.isEdit && boardID) {

            console.log("props.isEdit:", props.isEdit); // 값 확인
            console.log("boardID:", boardID); // 값 확인

            const fetchBoardData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/posts/${boardID}/`);
                    const boardData = response.data;

                    console.log("타이틀:", boardData)

                    // 가져온 게시물 데이터를 상태에 설정
                    setTitle(boardData.title);
                    setBody(boardData.body);
                    setAddressTitle(boardData.addressTitle);
                    setCountry(boardData.country);
                    // 이미지나 다른 필드들도 가져와서 설정할 수 있습니다.
                } catch (error) {
                    console.error('게시물 데이터를 가져오는 데 실패했습니다.', error);
                }
            };

            fetchBoardData();
        }
    }, [props.isEdit, boardID]);






    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                document.getElementById('autocomplete'),
                { types: ['geocode'] }
            );
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    handlePlaceSelect(place);
                }
            });
        }
    }, [isOpen]);


    const onClickAddressSearch = (index) => {
        setCurrentAddressIndex(index);
        setIsOpen(true);
    };

    const handlePlaceSelect = (place) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[currentAddressIndex] = {
            address: place.formatted_address,
            location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            },
        };
        setAddresses(updatedAddresses);
        setIsOpen(false);


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


    const onClickSubmit = async () => {
        if (!isFormValid) {
            setModalMessage("제목, 본문, 경로 제목, 주소를 모두 입력해 주세요.");
            setIsModalVisible(true);
            return;
        }

        if (!token) {
            setModalMessage("로그인이 필요합니다.");
            setIsModalVisible(true);
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const addressStrings = addresses.map(address => address.address);

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('body', body); // 본문 전송
        formData.append('addressTitle', addressTitle);
        formData.append('addresses', JSON.stringify(addressStrings));
        formData.append('country', country);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/posts/", formData);
            console.log(response.data);

            
            await axios.post(
                `http://localhost:8080/api/posts/${response.data.boardID}/thumbnail`,
                { body },
                { headers: { 'Content-Type': 'application/json' } } // JSON 형식 명시
            );

            console.log("board가 찍히나:", response.data.boardID);
            navigate(`/board/${response.data.boardID}`);
        } catch (error) {
            console.error(error);
        }
    };

    // 게시물 수정하기
    const onClickUpdate = async () => {

        if (!isFormValid) {
            setModalMessage("제목, 본문, 경로 제목, 주소를 모두 입력해 주세요.");
            setIsModalVisible(true);
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const addressStrings = addresses.map(address => address.address);

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('body', body); // 본문 전송
        formData.append('addressTitle', addressTitle);
        formData.append('addresses', JSON.stringify(addressStrings)); // 주소 리스트 전송
        formData.append('country', country);

        if (image) {
            formData.append('image', image); // 이미지가 있으면 추가
        }

        // 게시물 ID가 정상적으로 설정되어 있는지 확인
        console.log("게시물 수정 요청, boardID:", boardID);

        try {
            const response = await axios.put(`http://localhost:8080/api/posts/${boardID}`, formData);
            console.log("게시물 수정 성공:", response.data);
            navigate(`/board/${boardID}`);
        } catch (error) {
            console.error("게시물 수정 실패:", error);
        }
    };



    const addAddressField = () => {
        if (addresses.length < 10) {
            setAddresses([...addresses, { address: "", location: { lat: null, lng: null } }]);
        }
    };

    const removeAddressField = (index) => {
        if (addresses.length > 1) { // 최소 1개의 주소 필드는 유지
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(updatedAddresses);
        }
    };

    const handleAddressChange = (index, field, value) => {
        const updatedAddresses = [...addresses];
        // Update address field
        updatedAddresses[index][field] = value;
        // Reset location fields to null
        updatedAddresses[index].location = { lat: null, lng: null };
        setAddresses(updatedAddresses);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedAddresses = [...addresses];
        const [removed] = reorderedAddresses.splice(result.source.index, 1);
        reorderedAddresses.splice(result.destination.index, 0, removed);

        setAddresses(reorderedAddresses);
    };

    const quill = new Quill("#editor");


    const countries = [
        "대한민국", "미국", "일본", "중국", "영국", "독일", "프랑스", "캐나다", "호주", "이탈리아",
        "뉴질랜드"
    ];

    // 국가 검색어와 필터링된 국가 리스트를 위한 상태
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    // 검색어 입력 시 상태 업데이트 및 필터링 수행
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            // 검색어로 필터링된 국가 목록 생성
            const filtered = countries.filter(country =>
                country.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCountries(filtered);
        } else {
            // 검색어가 비어있으면 필터링된 목록 초기화
            setFilteredCountries([]);
        }
    };

    // 국가 선택 시 처리
    const handleCountrySelect = (country) => {
        setCountry(country);
        setSearchTerm(country); // 선택한 국가를 검색창에 표시
        setFilteredCountries([]); // 필터링된 목록 초기화
    };


    return (
        <>
            <TopBarComponent />
            <S.Container>
                <S.Wrapper>
                    <S.Title>{props.isEdit ? "리뷰 수정하기" : "리뷰 작성하기"}</S.Title>

                    <S.InputWrapper>
                        <S.Subject
                            type="text"
                            placeholder="제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <S.Error>{titleError}</S.Error>



                        <S.InputWrapper>
                            <input
                                type="text"
                                placeholder="국가를 검색하세요"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ width: "100%", height: "25px", padding: "10px",borderRadius:"15px", fontSize: "15px"}}
                            />
                            {/* 필터링된 국가 목록 표시 */}
                            {filteredCountries.length > 0 && (
                                <ul style={{ border: "1px solid #ccc", maxHeight: "150px", overflowY: "auto", padding: "0", listStyle: "none" }}>
                                    {filteredCountries.map((country, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCountrySelect(country)} // 클릭 시 국가 선택
                                            style={{
                                                padding: "10px",
                                                cursor: "pointer",
                                                backgroundColor: "#f0f0f0",
                                                borderBottom: "1px solid #ddd",
                                            }}
                                        >
                                            {country}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </S.InputWrapper>
                    </S.InputWrapper>




                    <S.InputWrapper>
                        <QuillEditor value={body} onChange={setBody} />
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.AddressSubject
                            type="text"
                            placeholder="나만의 경로 제목을 입력하세요"
                            value={addressTitle}
                            onChange={(e) => setAddressTitle(e.target.value)}
                        />
                    </S.InputWrapper>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="addresses">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {addresses.map((address, index) => (
                                        <Draggable key={index} draggableId={`${index}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <S.InputWrapper>
                                                        <S.ZipcodeWrapper>
                                                            <S.SearchButton onClick={() => onClickAddressSearch(index)}>
                                                                {`${index + 1}번째 위치 검색`}
                                                            </S.SearchButton>
                                                        </S.ZipcodeWrapper>
                                                        <S.Address
                                                            placeholder="주소를 입력하세요"
                                                            value={address.address}
                                                            onChange={(e) => handleAddressChange(index, 'address', e.target.value)}
                                                        />
                                                        {addresses.length > 1 && (
                                                            <S.RemoveButton onClick={() => removeAddressField(index)}>삭제</S.RemoveButton>
                                                        )}
                                                    </S.InputWrapper>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {addresses.length < 10 && (
                        <S.AddButton onClick={addAddressField}>추가</S.AddButton>
                    )}

                    {isOpen && (
                        <Modal
                            title="위치 검색"
                            visible={isOpen}
                            onCancel={() => setIsOpen(false)}
                            footer={null}
                        >
                            {/* 구글 장소 검색 입력 */}
                            <input
                                type="text"
                                id="autocomplete"
                                placeholder="주소를 입력하세요"
                                style={{ width: "100%", padding: "10px" }}
                            />
                        </Modal>
                    )}

                    <S.MapWrapper>
                        <MapComponent addresses={addresses} setAddresses={setAddresses} currentAddressIndex={currentAddressIndex} />
                    </S.MapWrapper>

                    <S.ButtonWrapper>
                        <Link to={props.isEdit ? "#" : "/board"}>
                            <Tooltip title={!isFormValid ? "모든 내용을 다 채워주세요" : ""}>
                            <S.SubmitButton
                                onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                                disabled={!isFormValid}

                            >
                                {props.isEdit ? "수정" : "저장"}
                            </S.SubmitButton>
                            </Tooltip>
                        </Link>
                    </S.ButtonWrapper>
                </S.Wrapper>
            </S.Container>

            {/* 모달 컴포넌트 */}
            <Modal
                title="알림"
                visible={isModalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
            >
                <p>{modalMessage}</p>
            </Modal>
        </>
    );
}
