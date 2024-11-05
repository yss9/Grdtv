import styled from "styled-components";

export const StyledApp = styled.div`
  width: 1500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  //background-image: linear-gradient(45deg, #8B5CF6, #EC4899);
  font-family: 'Montserrat', sans-serif;
`;

export const StyledCarousel = styled.div`
    position: relative;
    width: 900px;
    height: 350px;
    perspective: 600px;
    transform-style: preserve-3d;
  align-items: center;
  justify-content: center;
  
`;

export const StyledCardContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transform:
        rotateY(calc(var(--offset) * 50deg))
        scaleY(calc(1 + var(--abs-offset) * -0.4))
        translateZ(calc(var(--abs-offset) * -30rem))
        translateX(calc(var(--direction) * -5rem));
    filter: blur(calc(var(--abs-offset) * 1rem));
    transition: all 0.3s ease-out;
  
`;

export const StyledCard = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    background-color: hsl(0deg, 0%, calc(100% - var(--abs-offset) * 50%));
    border-radius: 1rem;
    color: #9CA3AF;
    text-align: justify;
    transition: all 0.3s ease-out;

    h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 0.7em;
        color: #1F2937;
    }

    p, h2 {
        transition: all 0.3s ease-out;
        opacity: var(--active);
    }
`;

export const StyledNavLeft = styled.button`
  color: #4353ed;
  font-size: 5rem;
  //position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 0;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;
  
`;

export const StyledNavRight = styled(StyledNavLeft)`
    left: unset;
    right: 0;
  margin-left: 64px;
  
`;