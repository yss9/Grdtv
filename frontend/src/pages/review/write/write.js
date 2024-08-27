import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import * as S from "./style";
import { Modal } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import TopBarComponent from "../../../components/TopBar/TopBar";
import MapComponent from "./MapComponent";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 퀼 에디터의 기본 스타일시트를 가져옵니다.
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuillEditor from "../../../components/Editor/QuillEditor";



export default function BoardWrite(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState("");
    const [addressTitle, setAddressTitle] = useState(""); // 경로 제목 상태 추가
    const [addresses, setAddresses] = useState([{ address: "", location: { lat: null, lng: null } }]);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
    const quillRef = useRef(null); // ReactQuill ref

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

/*    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/!*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await axios.post("http://localhost:8080/api/posts/upload/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const url = res.data.url; // 서버에서 반환한 이미지 URL

                const quill = quillRef.current.getEditor(); // Quill 인스턴스를 가져옵니다.
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', url);
            } catch (error) {
                console.log(error);
            }
        };
    }, []);*/



   /* const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };*/

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

    const onClickSubmit = async () => {
        if (title === "") {
            setTitleError("제목을 입력해주세요.");
            return;
        }

        const addressStrings = addresses.map(address => address.address);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body); // 에디터의 내용을 추가
        formData.append('addressTitle', addressTitle);
        formData.append('addresses', JSON.stringify(addressStrings));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/posts/", formData);
            console.log(response.data);
            alert("게시물 등록이 정상적으로 완료되었습니다!");
            navigate(`/board/${response.data.boardID}`);
        } catch (error) {
            console.error(error);
        }
    };

    const onClickUpdate = async () => {
        const boardID = new URLSearchParams(window.location.search).get('boardID');

        if (title === "" && body === "" && !image) {
            alert("수정할 내용이 없습니다.");
            return;
        }

        const addressStrings = addresses.map(address => address.address);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('addressTitle', addressTitle); // addressTitle 추가
        formData.append('addresses', JSON.stringify(addressStrings));

        try {
            const response = await axios.put(`http://localhost:8080/api/posts/${boardID}/`, formData);
            console.log(response.data);
            alert("게시물 수정이 정상적으로 완료되었습니다!");
            navigate(`/board/${response.data.boardID}`);
        } catch (error) {
            console.log(error);
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

    return (
        <>
            <TopBarComponent />
            <S.Container>
                <S.Wrapper>
                    <S.Title>{props.isEdit ? "Review 수정" : "리뷰 작성하기"}</S.Title>

                    <S.InputWrapper>
                        <S.Subject
                            type="text"
                            placeholder="제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <S.Error>{titleError}</S.Error>
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
                            <S.SubmitButton
                                onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                                isActive={title !== ""}
                            >
                                {props.isEdit ? "수정" : "저장"}
                            </S.SubmitButton>
                        </Link>
                    </S.ButtonWrapper>
                </S.Wrapper>
            </S.Container>
        </>
    );
}
