import Topic from "../models/Topic.js";
import Skill from "../models/Skill.js";

/* ================= ADMIN ================= */

export const getTopicsBySkill = async (req, res) => {
  try {
    const topics = await Topic.find({ skill: req.params.skillId })
      .sort({ createdAt: 1 });

    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { title, content, skillId } = req.body;

    if (!title || !skillId) {
      return res.status(400).json({ message: "Title & skillId required" });
    }

    const topic = await Topic.create({
      title: title.trim(),
      content,
      skill: skillId,
    });

    await Skill.findByIdAndUpdate(skillId, {
      $push: { topics: topic._id },
    });

    res.status(201).json({
      message: "Topic added successfully",
      topic,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title?.trim(),
        content: req.body.content,
      },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic updated", topic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    await Skill.findByIdAndUpdate(topic.skill, {
      $pull: { topics: topic._id },
    });

    await topic.deleteOne();

    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= STUDENT ================= */

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};












/*

import Topic from "../models/Topic.js";
import Skill from "../models/Skill.js";



export const getTopicsBySkill = async (req, res) => {
  try {
    const topics = await Topic.find({ skill: req.params.skillId })
      .sort({ createdAt: 1 });

    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { title, content, skillId } = req.body;

    if (!title || !skillId) {
      return res.status(400).json({ message: "Title & skillId required" });
    }

    const topic = await Topic.create({
      title: title.trim(),
      content,
      skill: skillId,
    });

    await Skill.findByIdAndUpdate(skillId, {
      $push: { topics: topic._id },
    });

    res.status(201).json({
      message: "Topic added successfully",
      topic,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title?.trim(),
        content: req.body.content,
      },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic updated", topic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    await Skill.findByIdAndUpdate(topic.skill, {
      $pull: { topics: topic._id },
    });

    await topic.deleteOne();

    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/