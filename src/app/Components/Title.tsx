import React from "react";

export default function Title()
{
    return (
        <div className="title-component">
            <div className="video-container">
                <video id="title-video" src="y2mate.is - الحرب التي ستدمر الكوكب! الغزو الصيني لتايوان ليس كروسيا وأوكرانيا!-2oybt9Lvjq0-720p-1707521234.mp4"></video>
                <img id="back" src="back.png"></img>
                <img id="next" src="next.png"></img>
                <img id="black-circle" src="black-circle.png"></img>
                <img id="black-circle" src="black-circle.png"></img>
                <img id="black-circle" src="black-circle.png"></img>
            </div>
            <div className="title-container">
                <div className="title-container-close">
                    <img src="close.png"></img>
                </div>
                <div className="add-title">
                    <label>Add Title :</label>
                    <input type="text"></input>
                </div>
                <div className="title-icon">
                    <img src="cc.png"></img>
                    <img src="edit.png"></img>
                    <img src="ai.png"></img>
                </div>
                <div className="title-update">
                    <button>Update</button>
                </div>
            </div>
        </div>
    )
}