import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://new-idsi.onrender.com", // <- THIS is what I need to check!
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleChange} />
      <button className="analyze-button" onClick={handleUpload}>
        Upload
      </button>

      {result && (
        <div className="results-card">
          <h3>Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

