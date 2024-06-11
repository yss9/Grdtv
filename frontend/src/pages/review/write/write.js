import React, { useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import styled from 'styled-components';
import axios from "axios";

Quill.register('modules/imageResize', ImageResize);

const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
    'image',
];

const WriteTitleContainer = styled.div`
    display: flex;
`;
const Title = styled.div``;
const WriteTitle = styled.input``;
const RegisterBtn = styled.button``;
const ContentContainer = styled.div``;

const QuillEditor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
                handlers: {
                    image: () => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.click();

                        input.onchange = async () => {
                            const file = input.files[0];
                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                                const response = await axios.post('/api/posts', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });

                                const range = this.quill.getSelection();
                                const link = response.data.url;
                                this.quill.insertEmbed(range.index, 'image', link);
                            } catch (error) {
                                console.error('Error uploading image:', error);
                            }
                        };
                    },
                },
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize', 'Toolbar'],
            },
        };
    }, []);

    const handleRegister = async () => {
        try {
            const response = await axios.post('/api/savePost', {
                title,
                content,
            });
            console.log('Post saved:', response.data);
            // Handle success, maybe clear the form or redirect the user
        } catch (error) {
            console.error('Error saving post:', error);
            // Handle error, maybe show a notification to the user
        }
    };

    return (
        <>
            <WriteTitleContainer>
                <Title>제목:</Title>
                <WriteTitle
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </WriteTitleContainer>
            <ContentContainer>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={setContent}
                />
            </ContentContainer>
            <RegisterBtn onClick={handleRegister}>등록</RegisterBtn>
        </>
    );
};

export default QuillEditor;
