// src/components/Editor/QuillEditor.js
import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

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

    return (
        <div className="text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                ref={quillRef}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default QuillEditor;
