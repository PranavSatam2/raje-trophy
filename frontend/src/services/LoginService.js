import axios from 'axios';

const BASE_URL_LOGIN = "http://localhost:8080/api";

const LoginService = {
  login: (data) => {
    return axios.post(`${BASE_URL_LOGIN}/login`, data);
  },
};

export default LoginService;
