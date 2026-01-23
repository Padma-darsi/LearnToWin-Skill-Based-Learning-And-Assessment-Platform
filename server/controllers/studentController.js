import Skill from "../models/Skill.js";

export const getStudentSidebar = async (req, res) => {
  const skills = await Skill.find()
    .populate("topics", "title")
    .select("name topics");

  res.json(skills);
};
