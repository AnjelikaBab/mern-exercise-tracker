// routes/strengthExercises.js
const express = require('express');
const router = express.Router();
const StrengthExercise = require('../models/strengthExerciseModel'); // Ensure you have this model

// POST endpoint to add a new strength exercise
router.post('/add', async (req, res) => {
  try {
    const newExercise = new StrengthExercise(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
