// src/components/Editor/QuillEditor.js
import React, {useMemo, useRef} from 'react';
import ReactQuill from "react-quill-new";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const QuillEditor = ({ value, onChange }) => {
    const quillRef = useRef(null);

    const handleChange = (content) => {
        if (onChange) onChange(content);
    };

    // 이미지 처리를 하는 핸들러
    const imageHandler = () => {
        console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.

        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
            console.log('온체인지');
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file); // formData는 키-밸류 구조
            try {
                const result = await axios.post('http://localhost:8080/api/fileUpload/', formData);
                console.log('성공 시, 백엔드가 보내주는 데이터', result.data.imageUrl);
                console.log(result.data);
                const IMG_URL = "http://127.0.0.1:8080/image/" + result.data.imageUrl;

                const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', IMG_URL);
                console.log(IMG_URL);
            } catch (error) {
                console.log('실패했어요ㅠ');
            }
        });
    };

    const quillModules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
                    ['image'],
                ],
                handlers: { image: imageHandler },
            },
        }),
        [],
    );

    return (
        <div className="text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                ref={quillRef}
                modules={quillModules}
                formats={formats}

            />
        </div>
    );
};

export default QuillEditor;
