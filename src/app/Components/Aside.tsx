"use client";
import React, { useState } from "react";

export default function Aside()
{
    const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);


    const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setUploadedVideos(prevVideos => [...prevVideos, URL.createObjectURL(file)]);
        }
    };
    const handleVideoSelect = (videoURL: string) => {
        console.log("video : ", videoURL);
        setSelectedVideo(videoURL);
    };
    return (
        <div className="aside">
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
    )
}