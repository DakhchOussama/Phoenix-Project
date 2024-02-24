import React, { useEffect, useState } from "react";
import Title from "./Title";


interface SectionProps {
    selectedVideo: string | null;
}

interface Video {
    videoURL: string;
    title: string;
  }

const Section: React.FC<SectionProps> = ({ selectedVideo }) => {

    const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);

    useEffect(() => {
        if (selectedVideo) {
          setSelectedVideos(prevSelectedVideos => [
            ...prevSelectedVideos,
            { videoURL: selectedVideo, title: '' }
          ]);
        }
      }, [selectedVideo]);

      const handleAddVideo = (videoURL: string, title: string) => {
        setSelectedVideos(prevSelectedVideos => [
          ...prevSelectedVideos,
          { videoURL, title }
        ]);
      };
    return (
        <div className="Section">
            <div className="Section-Title">
                <h1>Video Tree</h1>
            </div>
            <div className="Section-content">
            {selectedVideos.map((video, index) => (
                <>
                    {index != 0 && <Title selectedVideo={video.videoURL} onClose={() => setSelectedVideos(prevVideos => prevVideos.filter((_, i) => i !== index))} onAddVideo={handleAddVideo}></Title>}
                    <div key={index} className="list-videos">
                    <video key={index} id="videotree" src={video.videoURL} autoPlay muted></video>
                    <div className="double-arrow">
                        <img src="add.png"></img>
                        <img src="785427-200.png"></img>
                    </div>
                    </div>
                </>
            ))}
                {!selectedVideo && <img src="cloud-computing.png"></img>}
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

export default Section;