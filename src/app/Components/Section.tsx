import React from "react";

export default function Section()
{
    return (
        <div className="Section">
            <div className="Section-Title">
                <h1>Video Tree</h1>
            </div>
            <div className="Section-content">
                <img src="cloud-computing.png"></img>
            </div>
            <div className="user-infor">
                <div className="user-infor-img">
                    <img src="userimg.JPG" id="user" width={50} height={50}></img>
                    <img src="setting.png" id="setting" width={20} height={20}></img>
                    <img src="bookmark.png" id="bookmark" width={20} height={20}></img>
                </div>
            </div>
        </div>
    )
}