import React, { useState } from "react";
import axios from "axios";
import "./styles/ImageUploader.css";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post("http://localhost:8000/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPrediction(response.data);
    } catch (err) {
      setError("An error occurred while uploading the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-uploader-container">
      <h2 className="title">Image Classifier</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />

        {selectedImage && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              className="preview-img"
            />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Predict"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {prediction && (
        <div className="result">
          <h3>Prediction:</h3>
          <p><strong>Predicted Class:</strong> {prediction.predicted_class}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
