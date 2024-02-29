import React, { useState } from "react";
import TitleAi from "./TitleAi";
import { Toaster, toast } from "react-hot-toast";

interface TitleProps {
    selectedVideo: string | null;
    onClose: () => void;
    onAddVideo: (videoURL: string, title: string, parenttitle: string) => void;
}

const Title: React.FC<TitleProps> = ({ selectedVideo, onClose, onAddVideo }) =>
{
    const [showTitleAi, setShowTitleAi] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [parenttitle, setparenttitle] = useState<string>("");

    const handleAddVideo = () => {
        if (selectedVideo && title) {
            onAddVideo(selectedVideo, title, parenttitle);
            toast.success('Successfully');
        }
        else
            toast.error("Empty Title");
    };
    return (
        <>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <div className="title-component">
            <div className="video-container">
                {selectedVideo && <video id="title-video" src={selectedVideo} autoPlay muted></video>}
                <img id="back" src="back.png"></img>
                <img id="next" src="next.png"></img>
                <img id="black-circle" src="black-circle.png"></img>
                <img id="black-circle" src="black-circle.png"></img>
                <img id="black-circle" src="black-circle.png"></img>
            </div>
            <div className="title-container">
                <div className="title-container-close">
                    <img src="close.png" onClick={onClose}></img>
                </div>
                <div className="add-title">
                    <label>Add Title :</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div className="add-title">
                    <label>Parent Title :</label>
                    <input type="text" onChange={(e) => setparenttitle(e.target.value)}></input>
                </div>
                <div className="title-icon">
                    <img src="cc.png"></img>
                    <img src="edit.png"></img>
                    <img src="ai.png" onClick={() => setShowTitleAi(true)}></img>
                </div>
                <div className="title-update">
                    <button onClick={handleAddVideo}>Add Video</button>
                </div>
            </div>
        </div>
        {showTitleAi && <TitleAi selectedVideo={selectedVideo} onClose={onClose}></TitleAi>}
        </>
    )
}

export default Title;