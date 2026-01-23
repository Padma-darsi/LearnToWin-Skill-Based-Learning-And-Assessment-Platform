import axios from "axios";

const API = "http://localhost:5000/api/quiz";

export const getQuiz = (conceptId) => axios.get(`${API}/${conceptId}`);
export const submitQuiz = (conceptId, answers) => axios.post(`${API}/${conceptId}/submit`, { answers });
