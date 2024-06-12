import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostImage = ({ postId }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        // 포스트 ID를 이용하여 서버로부터 이미지 데이터를 가져옵니다.
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`/image/${postId}`, {
                    responseType: 'arraybuffer', // 이미지를 바이너리 데이터로 받습니다.
                });
                // 이미지 데이터를 base64로 변환합니다.
                const imageData = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                // 이미지 데이터를 상태에 저장합니다.
                setImageData(`data:image/jpeg;base64,${imageData}`);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        // 포스트 ID가 변경될 때마다 이미지 데이터를 다시 가져옵니다.
        fetchImageData();
    }, [postId]);

    // 이미지 데이터가 없으면 null을 반환합니다.
    if (!imageData) {
        return null;
    }

    // 이미지 데이터가 있으면 이미지를 표시합니다.
    return (
        <div>
            <h2>Post Image</h2>
            <img src={imageData} alt={`Post ${postId}`} />
        </div>
    );
};

export default PostImage;
