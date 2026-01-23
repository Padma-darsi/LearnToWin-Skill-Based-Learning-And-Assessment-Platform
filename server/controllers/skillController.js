/*import Skill from "../models/Skill.js";


export const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
};


export const createSkill = async (req, res) => {
  const { name } = req.body;

  const exists = await Skill.findOne({ name });
  if (exists) {
    return res.status(400).json({ message: "Skill already exists" });
  }

  const skill = await Skill.create({ name });
  res.status(201).json(skill);
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const skill = await Skill.findById(id);

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  skill.name = name;
  await skill.save(); // 🔴 THIS WAS LIKELY MISSING

  res.json(skill);
};


export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  const skill = await Skill.findById(id);
  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  await skill.deleteOne(); // 🔴 correct delete
  res.json({ message: "Skill deleted" });
};

*/

