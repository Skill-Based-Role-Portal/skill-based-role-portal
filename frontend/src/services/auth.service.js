import axios from "axios";

const API_URL = "http://localhost:8000/staff";

const login = (email, password) => {
  return axios
    .post(API_URL + "/" + "login", {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.data));

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
