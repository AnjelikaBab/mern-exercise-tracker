// routes/cardioExercises.js
const express = require('express');
const router = express.Router();
const CardioExercise = require('../models/cardioExerciseModel'); // Ensure you have this model

// POST endpoint to add a new cardio exercise
router.post('/add', async (req, res) => {
  try {
    const newExercise = new CardioExercise(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
