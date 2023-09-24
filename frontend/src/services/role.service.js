import axios from 'axios';

const API_URL = 'http://localhost:5003/role';

const getRoles = () => {
  return axios.get(API_URL);
};

const getRoleById = id => {
  return axios.get(API_URL + '/' + id);
};

const createRole = payload => {
  return axios.post(API_URL, { ...payload });
};

const RoleService = {
  getRoles,
  getRoleById,
  createRole,
};

export default RoleService;
