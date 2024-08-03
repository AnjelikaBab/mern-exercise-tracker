const express = require('express');
const router = express.Router();
const CardioExercise = require('../models/cardioExerciseModel'); // Ensure you have this model
const auth = require('../../middleware/auth');

// POST endpoint to add a new cardio exercise
// Requires authentication
router.post('/add', auth, async (req, res) => {
  try {
    const newExercise = new CardioExercise({
      ...req.body,
      user: req.user._id // Associate exercise with the authenticated user
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all cardio exercises
// Requires authentication
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await CardioExercise.find({ user: req.user._id }); // Fetch exercises for the authenticated user
    res.json(exercises);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a cardio exercise by ID
// Requires authentication
router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await CardioExercise.findOneAndDelete({ _id: req.params.id, user: req.user._id }); // Delete only if it belongs to the user
    if (!exercise) {
      return res.status(404).json('Cardio Exercise not found or does not belong to you.');
    }
    res.json('Cardio Exercise deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET a cardio exercise by ID
// Requires authentication
router.get('/:id', auth, async (req, res) => {
  try {
    const exercise = await CardioExercise.findOne({ _id: req.params.id, user: req.user._id }); // Fetch only if it belongs to the user
    if (!exercise) {
      return res.status(404).json('Cardio Exercise not found or does not belong to you.');
    }
    res.json(exercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update a cardio exercise
// Requires authentication
router.post('/update/:id', auth, async (req, res) => {
  try {
    const exercise = await CardioExercise.findOne({ _id: req.params.id, user: req.user._id }); // Fetch only if it belongs to the user
    if (!exercise) {
      return res.status(404).json('Cardio Exercise not found or does not belong to you.');
    }

    exercise.workoutName = req.body.workoutName;
    exercise.date = Date.parse(req.body.date);
    exercise.incline = String(req.body.incline);
    exercise.distance = String(req.body.distance);
    exercise.speed = String(req.body.speed);
    exercise.time = String(req.body.time);

    await exercise.save();
    res.json('Cardio Exercise updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
