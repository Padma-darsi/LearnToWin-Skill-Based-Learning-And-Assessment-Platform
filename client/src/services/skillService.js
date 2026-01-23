import axios from "axios";

const API = "http://localhost:5000/api/skills";

export const getSkills = () => axios.get(API);
export const getConcepts = (skillId) => axios.get(`${API}/${skillId}/concepts`);
