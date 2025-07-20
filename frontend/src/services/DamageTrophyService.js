import axios from 'axios';

const BASE_URL_DAMAGE = "http://localhost:8080/api/damaged-trophies";

const DamageTrophyService = {
  createDamageTrophy: (data) => {
    console.log("Creating damage trophy with data:", data);
    return axios.post(`${BASE_URL_DAMAGE}/add`, data);
  },

  getAllDamageTrophies: () => {
    return axios.get(`${BASE_URL_DAMAGE}`);
  },

  getDamageTrophyById: (id) => {
    return axios.get(`${BASE_URL_DAMAGE}/code/${id}`);
  },

  getDamageTrophyByCode: (trophyCode) => {
    return axios.get(`${BASE_URL_DAMAGE}/code/${trophyCode}`);
  },

  updateDamageTrophy: (id, data) => {
    return axios.put(`${BASE_URL_DAMAGE}/${id}`, data);
  },

  deleteDamageTrophy: (id) => {
    return axios.delete(`${BASE_URL_DAMAGE}/${id}`);
  },

  // Additional methods you might need
  getDamageTrophiesByLocation: (location) => {
    return axios.get(`${BASE_URL_DAMAGE}/location/${location}`);
  },

  getDamageTrophiesByDateRange: (startDate, endDate) => {
    return axios.get(`${BASE_URL_DAMAGE}/date-range?start=${startDate}&end=${endDate}`);
  }
};

export default DamageTrophyService;