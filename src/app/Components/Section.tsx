import React, { useEffect, useState } from "react";
import Title from "./Title";
import toast, { Toaster } from "react-hot-toast";


interface SectionProps {
    selectedVideo: string | null;
}

interface Video {
    videoURL: string;
    title: string;
  }

const Section: React.FC<SectionProps> = ({ selectedVideo }) => {

    const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);
    const [close, setclose] = useState<Boolean>(false);

    useEffect(() => {
        if (selectedVideo) {
          setSelectedVideos(prevSelectedVideos => [
            ...prevSelectedVideos,
            { videoURL: selectedVideo, title: '' }
          ]);
          setclose(false);
        }
      }, [selectedVideo]);

      const handleAddVideo = (videoURL: string, title: string, parenttitle: string) => {
        const index = selectedVideos.findIndex(video => video.videoURL === videoURL);
        const parentindex = selectedVideos.findIndex(video => video.title == parenttitle);
    if (index !== -1) {
        const updatedVideos = [...selectedVideos];
        if (parentindex !== -1){
          updatedVideos[index] = { ...updatedVideos[index], title: `${parenttitle} -> ${title}` };
        }
        else
          updatedVideos[index] = { videoURL, title };
          setSelectedVideos(updatedVideos);
    } else {
        setSelectedVideos(prevSelectedVideos => [
            ...prevSelectedVideos,
            { videoURL, title }
        ]);
    }
        setclose(true);
      };
    return (
      <>
       <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <div className="Section">
            <div className="Section-Title">
                <h1>Video Tree</h1>
            </div>
            <div className="Section-content">
            {selectedVideos.map((video, index) => (
                <>
                    {(index != 0 && close === false) && <Title selectedVideo={video.videoURL} onClose={() => {setSelectedVideos(prevVideos => prevVideos.filter((_, i) => i !== index)); setclose(true)}} onAddVideo={handleAddVideo}></Title>}
                    <div key={index} className="list-videos">
                      {video.title && <p>{video.title}</p>}
                    <video key={index} id="videotree" src={video.videoURL} autoPlay muted onClick={() => setSelectedVideos(prevVideos => prevVideos.filter((_, i) => i !== index))}></video>
                    <div className="double-arrow">
                        <img src="add.png" onClick={() => toast((t) => (
            <span>
              <b>Upload</b> other video
              <input id="file-upload" type="file"></input>
              <label htmlFor="file-upload" className="toast-upload">Upload</label>
            </span>
          ))}></img>
                        <img src="785427-200.png"></img>
                    </div>
                    </div>
                </>
            ))}
                {!selectedVideo && <img src="cloud-computing.png"></img>}
            </div>
            <div className="user-infor">
                <div className="user-infor-img">
                    <img src="user.png" id="user" width={40} height={40}></img>
                    <img src="setting.png" id="setting" width={20} height={20}></img>
                    <img src="bookmark.png" id="bookmark" width={20} height={20}></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Section;