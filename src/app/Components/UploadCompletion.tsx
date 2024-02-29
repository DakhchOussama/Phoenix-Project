import React, { useState } from "react";

const UploadCompletion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const cancelUpload = () => {
    onClose();
  };

  return (
    <div className="upload-completion">
      <h2>Upload Complete!</h2>
      <p>Your video has been successfully uploaded.</p>
      {saving ? (
        <p>Saving...</p>
      ) : (
        <div>
          <input type="text" placeholder="Enter project name" />
          <button className="save-button" onClick={handleSave}>Save to Account</button>
          <button className="cancel-button" onClick={cancelUpload}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UploadCompletion;
