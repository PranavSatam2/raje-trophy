// src/services/FileService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/files";

const FileService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  urlForId: (id) => `${BASE_URL}/${id}`,
};

export default FileService;


