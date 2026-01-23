import Concept from "../models/Concept.js";

/* ================= CREATE ================= */
export const createConcept = async (req, res) => {
  try {
    const concept = await Concept.create({
      title: req.body.title,
      skill: req.body.skillId
    });
    res.status(201).json(concept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= READ ================= */
export const getConcepts = async (req, res) => {
  try {
    const concepts = await Concept.find().populate("skill");
    res.json(concepts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateConcept = async (req, res) => {
  try {
    const concept = await Concept.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(concept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteConcept = async (req, res) => {
  try {
    await Concept.findByIdAndDelete(req.params.id);
    res.json({ message: "Concept deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/*


import Concept from "../models/Concept.js";


export const createConcept = async (req, res) => {
  try {
    const concept = await Concept.create({
      title: req.body.title,
      skill: req.body.skillId
    });
    res.status(201).json(concept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getConcepts = async (req, res) => {
  try {
    const concepts = await Concept.find().populate("skill");
    res.json(concepts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateConcept = async (req, res) => {
  try {
    const concept = await Concept.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(concept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteConcept = async (req, res) => {
  try {
    await Concept.findByIdAndDelete(req.params.id);
    res.json({ message: "Concept deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/