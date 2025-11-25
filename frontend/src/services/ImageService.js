import axios from "axios";

const API_BASE_URL = "https://rajesports07.in/api/images";
// const API_BASE_URL = "http://localhost:8080/api/images";

class ImageService {

  // -----------------------------
  // ADMIN: Upload Images (Needs JWT)
  // -----------------------------
  uploadImages(formData) {
    return axios.post(API_BASE_URL, formData, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // -----------------------------
  // ADMIN: Get all images (Needs JWT)
  // -----------------------------
  getAllImagesAdmin() {
    return axios.get(API_BASE_URL, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // -----------------------------
  // PUBLIC: Get all images (NO JWT)
  // -----------------------------
  getAllImagesPublic() {
    return axios.get(API_BASE_URL); // no headers
  }

  // -----------------------------
  // ADMIN: Delete image (Needs JWT)
  // -----------------------------
  deleteImage(id) {
    return axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // -----------------------------
  // PUBLIC IMAGE URL (NO TOKEN)
  // -----------------------------
  getImageUrl(id) {
    return `${API_BASE_URL}/${id}`;
  }
}

export default new ImageService();
