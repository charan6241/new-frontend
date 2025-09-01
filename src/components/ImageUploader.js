import React, { useState } from 'react';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://new-idsi.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Upload successful: ${JSON.stringify(result)}`);
      } else {
        setMessage('Upload failed.');
      }
    } catch (error) {
      setMessage('Error uploading file.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ImageUploader;
