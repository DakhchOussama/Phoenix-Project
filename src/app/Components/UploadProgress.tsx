import React, { useEffect, useState } from "react";

const UploadProgress: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      } else {
        clearInterval(interval);
        onClose();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress, onClose]);

  const cancelUpload = () => {
    setProgress(0);
    onClose();
  };

  return (
    <div className="upload-progress">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Uploading: {progress}%</p>
      <button className="cancel-button" onClick={cancelUpload}>Cancel</button>
    </div>
  );
};

export default UploadProgress;
