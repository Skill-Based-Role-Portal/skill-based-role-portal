import axios from "axios";

const API_URL = "http://localhost:5002/application";

const getApplications = () => {
  return axios.get(API_URL);
};

const getApplicationByStaffId = (staffId) => {
  return axios.get(API_URL + "/staff/" + staffId);
};

const getApplicationByRoleId = (roleId) => {
  return axios.get(API_URL + "/role/" + roleId);
};

const getApplicantsByRoleId = (roleId) => {
  return axios.get(API_URL + "/applicants/" + roleId);
};

const createApplication = (payload) => {
  return axios.post(API_URL, { ...payload });
};

const ApplicationService = {
  getApplications,
  getApplicationByStaffId,
  getApplicationByRoleId,
  getApplicantsByRoleId,
  createApplication,
};

export default ApplicationService;
