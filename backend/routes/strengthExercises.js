const express = require('express');
const router = express.Router();
const StrengthExercise = require('../models/strengthExerciseModel'); // Ensure you have this model
const auth = require('../../middleware/auth');

// POST endpoint to add a new strength exercise
// Requires authentication
router.post('/add', auth, async (req, res) => {
  try {
    const newExercise = new StrengthExercise({
      ...req.body,
      user: req.user._id // Associate exercise with the authenticated user
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all strength exercises
// Requires authentication
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await StrengthExercise.find({ user: req.user._id }); // Fetch exercises for the authenticated user
    res.json(exercises);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a strength exercise by ID
// Requires authentication
router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await StrengthExercise.findOneAndDelete({ _id: req.params.id, user: req.user._id }); // Delete only if it belongs to the user
    if (!exercise) {
      return res.status(404).json('Strength Exercise not found or does not belong to you.');
    }
    res.json('Strength Exercise deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET a strength exercise by ID
// Requires authentication
router.get('/:id', auth, async (req, res) => {
  try {
    const exercise = await StrengthExercise.findOne({ _id: req.params.id, user: req.user._id }); // Fetch only if it belongs to the user
    if (!exercise) {
      return res.status(404).json('Strength Exercise not found or does not belong to you.');
    }
    res.json(exercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update a strength exercise
// Requires authentication
router.post('/update/:id', auth, async (req, res) => {
  try {
    const exercise = await StrengthExercise.findOne({ _id: req.params.id, user: req.user._id }); // Fetch only if it belongs to the user
    if (!exercise) {
      return res.status(404).json('Strength Exercise not found or does not belong to you.');
    }

    exercise.workoutName = req.body.workoutName;
    exercise.date = Date.parse(req.body.date);
    exercise.sets = req.body.sets.map(set => ({
      weight: String(set.weight),
      reps: String(set.reps)
    }));

    await exercise.save();
    res.json('Strength Exercise updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
