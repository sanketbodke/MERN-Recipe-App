// UploadWidget.jsx
import { useEffect, useRef } from 'react';
import { Tag } from "antd";

const UploadWidget = ({ onImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'sanket12',
            upload_preset: 'plcy9ur1',
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                // Call the callback function with the uploaded image URL
                onImageUpload(result.info.secure_url);
            } else {
                console.error("Upload error:", error);
            }
        });

    }, [onImageUpload]);

    return (
        <>
            <Tag style={{marginTop: '10px', cursor: 'pointer'}} onClick={() => widgetRef.current.open()}>Upload Recipe Image</Tag>
        </>
    );
};

export default UploadWidget;
