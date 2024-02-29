import React from "react";
import { FaGoogleDrive } from "react-icons/fa";
import { FiCloud, FiBox, FiUpload } from "react-icons/fi";

const UploadOptions = () => {
  return (
    <div className="upload-options">
      <div className="upload-option">
        <FiCloud className="upload-icon" />
        <p>Cloud Storage</p>
      </div>
      <div className="upload-option">
        <FiBox className="upload-icon" />
        <p>File Manager</p>
      </div>
      <div className="upload-option">
        <FaGoogleDrive className="upload-icon" />
        <p>Google Drive</p>
      </div>
    </div>
  );
};

export default UploadOptions;
