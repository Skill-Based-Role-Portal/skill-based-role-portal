import axios from "axios";

const API_URL = "http://localhost:5004/skill";

const getSkills = () => {
  return axios.get(API_URL);
};

const getSkillNames = () => {
  return axios.get(API_URL + "/" + "names");
};

const SkillService = {
  getSkills,
  getSkillNames,
};

export default SkillService;
