import React, { useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

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

const QuillEditor = () => {
    const [setValues] = useState();

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
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize', 'Toolbar'],
            },
        };
    }, []);

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={setValues}
        />
    );
};

export default QuillEditor;
