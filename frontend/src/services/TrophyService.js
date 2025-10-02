import axios from "axios";

const BASE_URL = "http://localhost:8080/api/trophies";

const TrophyService = {
  createTrophy: (formData) =>
    axios.post(`${BASE_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getAllTrophies: () => axios.get(`${BASE_URL}`),

  getTrophyByCode: (trophyCode) => axios.get(`${BASE_URL}/${trophyCode}`),

  updateTrophyByCodeAndSize: (trophyCode, size, formData) =>
  axios.put(`${BASE_URL}/sell/${trophyCode}/size/${size}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),


  deleteTrophy: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default TrophyService;
