// src/services/SoldTrophyService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // change to your backend base URL

class SoldTrophyService {
  // Sell trophy
  sellTrophy(trophyCode, size, quantitySold, soldPrice, soldDate) {
    return axios.post(`${API_BASE_URL}/trophies/${trophyCode}/sell`, null, {
      params: {
        size,
        quantity: quantitySold,
        soldPrice,
        soldDate,
      },
    });
  }

  // Fetch sold trophies
  getAllSoldTrophies() {
    return axios.get(`${API_BASE_URL}/sold-trophies`);
  }
}

export default new SoldTrophyService();
