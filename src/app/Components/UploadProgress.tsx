import React, { useEffect, useState } from "react";
import UploadCompletion from "./UploadCompletion";

const UploadProgress: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      } else {
        clearInterval(interval);
        setUploadComplete(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  const cancelUpload = () => {
    setProgress(0);
    onClose();
  };

  return (
    <div className="upload-progress">
      {uploadComplete ? (
        <UploadCompletion onClose={onClose} />
      ) : (
        <>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p>Uploading: {progress}%</p>
          <button className="cancel-button" onClick={cancelUpload}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default UploadProgress;
