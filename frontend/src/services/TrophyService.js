// src/services/TrophyService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/rajetrophy";

const TrophyService = {
  createTrophy: (data) => axios.post(`${BASE_URL}/add`, data),

  getAllTrophies: () => axios.get(`${BASE_URL}/all`),

  getTrophyById: (id) => axios.get(`${BASE_URL}/${id}`),

  updateTrophy: (id, data) => axios.put(`${BASE_URL}/${id}`, data),

  deleteTrophy: (id) => axios.delete(`${BASE_URL}/${id}`),

  getTrophyByCode: (trophyCode, size) => axios.get(`${BASE_URL}/find/${trophyCode}/size/${size}`),

  updateTrophyByCodeAndSize: (trophyCode, size, data) =>
    axios.put(
      `${BASE_URL}/update/${encodeURIComponent(trophyCode)}/size/${size}`,
      data
    ),
  }
export default TrophyService;