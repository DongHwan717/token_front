import axios from 'axios';
import React, { useRef } from 'react';
import { validateFile } from './utils/FileValidator'; 

function FilePage() {
    const fileUrl = process.env.REACT_APP_BACKEND_FILE_URL;

    const fileInputRef = useRef(null);
    const isLoggedIn = localStorage.getItem('accessToken');

    if (!isLoggedIn) {
        window.location.href = '/';
        return null;
    }

    const handleUpload = async () => {
        const file = fileInputRef.current.files[0];
        const validation = validateFile(file);
        if (!validation.isValid) {
            alert(validation.message);
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(fileUrl+'/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('업로드 성공!');
        } catch (error) {
            if(error.status === 403) {
                window.location.href = '/'
            } else if(error.status === 400) {
                alert('파일 업로드 실패: ' + error.response.data.message);
            }
        }
    };

    return (
        <div>
            <h2>파일 업로드/다운로드</h2>
            <input type="file" ref={fileInputRef} />
            <button id='upload' onClick={handleUpload}>업로드</button>
            <button>다운로드</button>
        </div>
    );
}

export default FilePage;