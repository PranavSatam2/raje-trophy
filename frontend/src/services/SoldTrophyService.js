import axios from "axios";

const API_BASE_URL = "https://rajesports07.in/api"; 

// Get token from local storage
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

class SoldTrophyService {
  
  // ✅ Sell trophy (updates stock + stores sale record)
  sellTrophy(trophyCode, size, quantitySold, soldPrice, soldDate) {
    return axios.post(
      `${API_BASE_URL}/trophies/${encodeURIComponent(trophyCode)}/sell`,
      null,
      {
        params: {
          size,
          quantity: quantitySold,
          soldPrice,
          soldDate,
        },
        headers: authHeader,
      }
    );
  }

  // ✅ Get all sold trophy records
  getAllSoldTrophies() {
    return axios.get(`${API_BASE_URL}/sold-trophies`, {
      headers: authHeader,
    });
  }
}

export default new SoldTrophyService();
