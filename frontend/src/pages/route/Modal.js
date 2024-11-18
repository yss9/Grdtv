import React from 'react';
import {
    ModalWrapper, ModalContent, ModalImage, ModalTitle, ModalSubtitle, ModalText, CloseButton, MakeRouteButton
} from './modalstyle';
import {useNavigate} from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const onClickMakeRouteButton = () => {
        navigate('/routeNavigation');
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <p onClick={onClose} style={{cursor:'pointer', position:"absolute", top:"31%", left:"71%", fontSize:"30px",color:"#C7C7C7"}}>x</p>
                <div style={{width: '60%', height: 'auto', float: 'left', marginTop: "3%"}}>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <ModalSubtitle>OSAKA</ModalSubtitle>
                    <ModalTitle>일본 오사카</ModalTitle>

                    <ModalText>
                        오사카는 일본에서 두 번째로 큰 도시로,<br/>
                        풍부한 역사와 현대적인 매력이 공존하는 곳입니다.<br/>
                        활발한 네온사인과 맛있는 길거리 음식이 가득한 도톤보리, 일본의
                        대표적인 성 중 하나인 오사카 성 등 다양한 관광 명소가 있습니다.<br/>
                        유니버설 스튜디오 재팬에서는 가족과 함께 즐거운 시간을 보낼 수 있으며,
                        오코노미야키와 타코야키 같은 오사카의 대표 음식도 놓칠 수 없습니다.<br/>
                        오사카는 활기차고 매력적인 여행지로,<br/>
                        모든 방문객들에게 잊지 못할 추억을 선사합니다.
                    </ModalText>
                </div>
                <ModalImage src="/Img/오사카 이미지.png" alt="오사카 이미지"/>
                <MakeRouteButton onClick={onClickMakeRouteButton}>일정 만들기 &nbsp;&nbsp;&gt;</MakeRouteButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
