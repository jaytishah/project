// routes/results.js

const express = require('express');
const router = express.Router();
const Result = require('../models/Result'); // Mongoose model for results

// GET /api/results/:examId/marks - Get all student marks for an exam
router.get('/:examId/marks', async (req, res) => {
  try {
    const results = await Result.find({ examId: req.params.examId }, 'studentName marks');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results', error: err.message });
  }
});
// 
module.exports = router;
