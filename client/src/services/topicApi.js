import axios from "axios";

export const getTopic = (skill, concept, title) =>
  axios.get(`/api/topics/${skill}/${concept}/${title}`);
