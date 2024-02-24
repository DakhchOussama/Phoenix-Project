import React from "react";


interface TitleProps {
    selectedVideo: string | null;
    onClose: () => void;
}

const TitleAi: React.FC<TitleProps> = ({selectedVideo, onClose }) =>
{
    return (
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
                <div className="add-title" id="add-title-ai">
                    <label>Choose Title :</label>
                    <div className="add-title-choose">
                        <input id="choose" type="submit" value="What"></input>
                        <input id="choose" type="submit" value="What"></input>
                        <input id="choose" type="submit" value="What"></input>
                    </div>
                </div>
                <div className="title-update">
                    <button>Update</button>
                </div>
            </div>
        </div>
    )
}


export default TitleAi;