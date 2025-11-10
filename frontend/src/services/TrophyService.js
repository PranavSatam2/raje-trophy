import axios from "axios";

const BASE_URL = "http://localhost:8080/api/trophies";

const TrophyService = {

  createTrophy: (formData) =>
    axios.post(`${BASE_URL}/create`, formData, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
      },
    }),

  getAllTrophies: () =>
    axios.get(`${BASE_URL}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    }),

  getTrophyByCode: (trophyCode) =>
    axios.get(`${BASE_URL}/${trophyCode}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    }),

  updateTrophyByCodeAndSize: (trophyCode, size, formData) =>
    axios.put(`${BASE_URL}/sell/${encodeURIComponent(trophyCode)}/size/${size}`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      }
    ),

  deleteTrophy: (trophyCode, size) =>
  axios.delete(`${BASE_URL}/${encodeURIComponent(trophyCode)}/size/${size}`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
  }),

};

export default TrophyService;
