import axios from "axios";

const API_URL = "https://rajesports07.in/auth/login";

const login = async (username, password) => {
  const response = await axios.post(API_URL, { username, password });
  return response.data; // {token, role}
};

export default { login };
