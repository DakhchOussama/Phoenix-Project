"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedVideo } from './actions';


interface RootState {
    uploadedVideos: string[];
    selectedVideo: string | null;
}

export default function Aside()
{
    const uploadedVideos = useSelector((state : RootState) => state.uploadedVideos);
    const selectedVideo = useSelector((state : RootState) => state.selectedVideo);
    const dispatch = useDispatch();

    const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const videoURL = URL.createObjectURL(file);
            dispatch(setSelectedVideo(videoURL));
        }
    };
    const handleVideoSelect = (videoURL: string) => {
        console.log("video : ", videoURL);
        dispatch(setSelectedVideo(videoURL));
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