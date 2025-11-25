import React, { useEffect, useState } from "react";
import ImageService from "../services/ImageService";

function ProductGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const res = await ImageService.getAllImagesPublic();
      setImages(res.data);
    } catch (error) {
      console.error("Failed to load images", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-3">Available Trophy Products</h2>

      <div className="row g-4">
        {images.map((img) => (
          <div key={img.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card shadow-sm p-2" style={{ borderRadius: "10px" }}>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={ImageService.getImageUrl(img.id)}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center mt-4 text-muted">No images uploaded yet.</p>
      )}
    </div>
  );
}

export default ProductGallery;
