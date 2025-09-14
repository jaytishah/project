const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel');
const { protect, teacher } = require('../middleware/authMiddleware');

// Create multiple questions (teacher only)
router.post('/', protect, teacher, async (req, res) => {
  try {
    const questions = req.body.questions; // expect array of question objects
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Questions array is required' });
    }
    const createdQuestions = await Question.insertMany(questions.map(q => ({ ...q, createdBy: req.user._id })));
    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add other routes here as needed (e.g. get all questions)

module.exports = router;
