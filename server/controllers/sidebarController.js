

import Skill from "../models/Skill.js";
import Concept from "../models/Concept.js";
import Topic from "../models/Topic.js";
import Quiz from "../models/Quiz.js";

export const getSidebarData = async (req, res) => {
  try {
    const skills = await Skill.find();

    const result = await Promise.all(
      skills.map(async (skill) => {
        const concepts = await Concept.find({ skill: skill._id });
        const quizzes = await Quiz.find({ skill: skill._id });

        const conceptsWithTopics = await Promise.all(
          concepts.map(async (concept) => {
            const topics = await Topic.find({ concept: concept._id });
            return {
              _id: concept._id,
              title: concept.title,
              topics
            };
          })
        );

        return {
          _id: skill._id,
          name: skill.name,
          concepts: conceptsWithTopics,
          quizzes
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



