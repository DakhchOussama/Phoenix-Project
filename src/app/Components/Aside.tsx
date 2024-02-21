import React from "react";

export default function Aside()
{
    return (
        <div className="aside">
            <div className="logo">
                <h1>Phoenix</h1>
            </div>
            <div className="upload-video">
                <button>Upload</button>
                <div className="videos-place"></div>
            </div>
            <div className="upload-other">
                <p>Upload with Other</p>
            </div>
        </div>
    )
}