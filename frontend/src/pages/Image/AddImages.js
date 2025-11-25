import React, { useState } from "react";
import ImageService from "../../services/ImageService";

function AddImages() {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const MAX_IMAGES = 20;
  const VALID_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // Format file size
  const formatSize = (size) =>
    size < 1024
      ? size + " B"
      : size < 1024 * 1024
      ? (size / 1024).toFixed(1) + " KB"
      : (size / (1024 * 1024)).toFixed(1) + " MB";

  // Append new files
  const handleFiles = (fileList) => {
    const selected = Array.from(fileList);

    // Validate type
    const filtered = selected.filter((file) => {
      if (!VALID_TYPES.includes(file.type)) {
        alert(`${file.name} is not a valid image type!`);
        return false;
      }
      return true;
    });

    // Check quantity limit
    if (files.length + filtered.length > MAX_IMAGES) {
      alert(`You can upload a maximum of ${MAX_IMAGES} images!`);
      return;
    }

    const updatedFiles = [...files, ...filtered];
    setFiles(updatedFiles);

    const updatedPreview = updatedFiles.map((f) => ({
      url: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
    }));

    setPreview(updatedPreview);

    // Reset input
    document.getElementById("file-input").value = "";
  };

  // Remove individual image
  const removeImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);

    const newPreview = [...preview];
    newPreview.splice(index, 1);

    setFiles(newFiles);
    setPreview(newPreview);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const upload = async () => {
    if (files.length === 0) {
      return alert("Please select images!");
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      setLoading(true);
      setProgress(0);

      await ImageService.uploadImages(formData, (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      });

      alert("Uploaded successfully!");
      setFiles([]);
      setPreview([]);
      setProgress(0);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Upload Images</h3>

      {/* Drag & Drop */}
      <div
        className={`border p-4 text-center rounded ${
          dragActive ? "bg-light" : ""
        }`}
        style={{ borderStyle: "dashed", cursor: "pointer" }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <h5>Drag & drop images here</h5>
        <p>or click to select files</p>

        <input
          type="file"
          id="file-input"
          multiple
          accept="image/*"
          className="d-none"
          onClick={(e) => (e.target.value = null)}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {preview.length > 0 && (
        <div className="d-flex flex-wrap gap-3 mt-3">
          {preview.map((img, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={img.url}
                alt="preview"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <button
                className="btn btn-danger btn-sm"
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  borderRadius: "50%",
                  padding: "4px 8px",
                }}
                onClick={() => removeImage(index)}
              >
                ×
              </button>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                {img.name}
                <br />
                <span className="text-muted">{formatSize(img.size)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {loading && (
        <div className="mt-3">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-success mt-3"
        onClick={upload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default AddImages;
