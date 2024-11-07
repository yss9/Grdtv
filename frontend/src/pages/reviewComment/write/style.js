import styled from "@emotion/styled";

export const CommentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;  /* Adjusted for better visibility */
  margin: 40px auto;  /* Centering the comment box */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

export const CommentTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;  /* Added spacing between inputs */
  margin-bottom: 15px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

export const ContentsWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  background-color: white;
`;

export const Contents = styled.textarea`
  width: 100%;
  height: 120px;
  border: none;
  resize: none;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const ContentsLength = styled.div`
  color: gray;
  font-size: 12px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4E53EE;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
