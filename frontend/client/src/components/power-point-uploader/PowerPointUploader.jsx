import React, { useState } from "react";
import { ErrorMessage } from "../../constants/ErrorMessage";
import "./PowerPointUploader.css";
import PodcastPlayer from "../podcast-player/PodcastPlayer";
import Loading from "../loading/Loading";

const PowerPointUploader = () => {

    const [file, setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handFileChange = async (event) => {
        const file = event.target.files[0];
        if (file?.name?.endsWith('.ppt') || file?.name?.endsWith('.pptx')) {
            setFile(file);
            await handleUpload(file);
        }
        else {
            alert(ErrorMessage.INCORRECT_FILE_TYPE)
        }
    }

    const handleUpload = async (file) => {
        if(!file)
            return;

        const formData = new FormData();
        formData.append('file', file);

       // const api = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`http://localhost:8000/upload`, {
                method: 'POST',
                body: formData,
            });

            if(response.ok) {
                console.log('File uploaded successfully');
                await startProcessingFile();
                setUploadSuccess(true);
            } else {
                console.log('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
          }
    }

    const startProcessingFile = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/generate`, {
                method: 'GET'
            })

            const blob = await response.blob();
            setAudioUrl(URL.createObjectURL(blob));
            if (response.ok) {
                const data = await response.json();
                console.log("File processing result:", data.content);
            } else {
                console.log('File processing failed');
            }
        } catch (error) {
            console.error('Error processing file:', error);
        } finally {
            setIsLoading(false)
        }
        }

    return (
        <div className="uploader-container">
            
            {isLoading && <Loading />}

            {uploadSuccess ? (
                <>
                <div className="heading-container">
                    Enjoy and hope you have fun learning with this podcast!
                </div>
                <PodcastPlayer audioSrc={audioUrl}/>
                </>
            ) : (
            <>
            <div className="heading-container">
                Generate a podcast from your PowerPoint presentation :)
            </div>
                <label className="file-label">
                    Import a PowerPoint file
                    <input 
                    type="file"
                    accept=".ppt, .pptx"
                    onChange={handFileChange}
                    className="file-input"
                    />
                </label>
            </>
            )}
        </div>
    )
}

export default PowerPointUploader;