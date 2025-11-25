import axios from 'axios';

const BASE_URL_DAMAGE = "https://rajesports07.in/api/damage-trophies";
// const BASE_URL_DAMAGE = "http://localhost:8080/api/damage-trophies";

// Retrieve token from localStorage
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const DamageTrophyService = {

  createDamageTrophy: (formData) =>
    axios.post(`${BASE_URL_DAMAGE}/create`, formData, {
      headers: {
        ...authHeader,
        "Content-Type": "multipart/form-data",
      },
    }),

  getAllDamageTrophies: () =>
    axios.get(`${BASE_URL_DAMAGE}`, { headers: authHeader }),

  getDamageTrophyByCode: (trophyCode) =>
    axios.get(`${BASE_URL_DAMAGE}/code/${encodeURIComponent(trophyCode)}`, {
      headers: authHeader,
    }),

  updateByTrophyCodeAndSize: (trophyCode, size, sizeDetail) =>
    axios.put(
      `${BASE_URL_DAMAGE}/update/code/${encodeURIComponent(trophyCode)}/size/${size}`,
      sizeDetail,
      {
        headers: {
          ...authHeader,
          "Content-Type": "multipart/form-data",
        },
      }
    ),

  deleteByTrophyCodeAndSize: (trophyCode, size) =>
    axios.delete(`${BASE_URL_DAMAGE}/delete/code/${encodeURIComponent(trophyCode)}/size/${size}`, {
      headers: authHeader,
    }),
};

export default DamageTrophyService;
