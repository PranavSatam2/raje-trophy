import axios from "axios";

const API_URL = "http://15.206.219.199:8080/auth/login";

const login = async (username, password) => {
  const response = await axios.post(API_URL, { username, password });
  return response.data; // {token, role}
};

export default { login };
