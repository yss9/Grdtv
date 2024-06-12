import React, { useState } from 'react';
import axios from 'axios';

const Write = () => {
    const [post, setPost] = useState({}); // 포스트 데이터 상태
    const [file, setFile] = useState(null); // 파일 상태

    // 포스트 데이터 변경 핸들러
    const changeValue = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    // 파일 선택 핸들러
    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('post', JSON.stringify(post));

        try {
            // Axios를 사용하여 파일과 포스트 데이터를 서버로 전송
            await axios.post('http://localhost:8080/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // 요청이 성공하면 홈페이지로 이동
            window.location.href = '/';
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={changeValue} />
            {/* title 입력 필드 */}
            <input type="text" name="body" onChange={changeValue} />
            {/* body 입력 필드 */}
            <input type="file" onChange={selectFile} />
            {/* 파일 선택 필드 */}
            <button type="submit">등록</button>
            {/* 제출 버튼 */}
        </form>
    );
};

export default Write;
