import axios from 'axios';

const BASE_URL_DAMAGE = "http://localhost:8080/api/damage-trophies";

const DamageTrophyService = {
  createDamageTrophy: (formData) =>
    axios.post(`${BASE_URL_DAMAGE}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getAllDamageTrophies: () => axios.get(`${BASE_URL_DAMAGE}`),

  getDamageTrophyByCode: (trophyCode) => axios.get(`${BASE_URL_DAMAGE}/code/${trophyCode}`),

  updateByTrophyCodeAndSize: (trophyCode, size, sizeDetail) =>
    axios.put(`${BASE_URL_DAMAGE}/update/code/${encodeURIComponent(trophyCode)}/size/${size}`, sizeDetail),

  deleteByTrophyCodeAndSize: (trophyCode, size) =>
    axios.delete(`${BASE_URL_DAMAGE}/delete/code/${encodeURIComponent(trophyCode)}/size/${size}`)
};

export default DamageTrophyService;