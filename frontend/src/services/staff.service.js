import axios from "axios";

const API_URL = "http://localhost:5001/staff";

const getStaff = () => {
  return axios.get(API_URL);
};

const getManagers = () => {
  return axios.get(API_URL + "/" + "managers");
};

const StaffService = {
  getStaff,
  getManagers,
};

export default StaffService;
