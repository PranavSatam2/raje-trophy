// src/services/TrophyService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/rajetrophy";

const TrophyService = {
  createTrophy: (data) => axios.post(BASE_URL, data),
  getAllTrophies: () => axios.get(BASE_URL),
  getTrophyById: (id) => axios.get(`${BASE_URL}/${id}`),
  updateTrophy: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteTrophy: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default TrophyService;
