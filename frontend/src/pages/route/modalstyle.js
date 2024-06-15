import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
    background: white;
    border-radius: 10px;
    padding: 50px;
    width: 40%;
    height: 40%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalImage = styled.img`
  width: 38%;
    
  border-radius: 10px;
  margin-bottom: 20px;
    float: right;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
    font-weight: bold;
`;

export const ModalSubtitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  color: grey;
`;

export const ModalText = styled.p`
  font-size: 10px;
  line-height: 1.5;
  text-align: left;
    float: left;
    color: gray;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const MakeRouteButton = styled.button`
    float: right;
    border-radius: 20px;
    margin-left: 70%;
    border: none;
    background-color: #4E53EE;
    width: 110px;
    height: 35px;
    color: white;
    font-size: 12px;

    &:hover {
        cursor: pointer;
    }
    &:active {
        background-color: #3b40b4;
    }
`