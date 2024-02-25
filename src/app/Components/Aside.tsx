import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

// Include setSelectedVideo in AsideProps
interface AsideProps {
    setSelectedVideo: (videoURL: string) => void;
}

const Aside: React.FC<AsideProps> = ({ setSelectedVideo }) => 
{
    const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
    const [selectedVideo, setSelectedVideoLocal] = useState<string | null>(null);
    const [showAside, setShowAside] = useState<boolean>(false);

    const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setUploadedVideos(prevVideos => [...prevVideos, URL.createObjectURL(file)]);
        }
    };

    const handleVideoSelect = (videoURL: string) => {
        setSelectedVideoLocal(videoURL);
        setSelectedVideo(videoURL);
    };

    return (
        <>
         <div className={`aside ${showAside ? 'show-aside' : ''}`}>
            <div className="logo">
                <h1>Phoenix</h1>
            </div>
            <div className="upload-video">
                <form>
                    <input id="file-upload" type="file" onChange={handlechange}/>
                    <label htmlFor="file-upload" className="custom-file-upload-label">Choose File</label>
                </form>
                <div className="videos-place">
                {uploadedVideos.map((video, index) => (
                        <video key={index} id="videos" src={video}  onClick={() => handleVideoSelect(video)} />
                    ))}
                </div>
            </div>
            <div className="upload-other">
                <p>Upload with Other</p>
            </div>
        </div>
        <div className="icon-container" onClick={() => setShowAside(!showAside)}>
                <FaBars className="icon" />
        </div>
        </>
    )
}

export default Aside;