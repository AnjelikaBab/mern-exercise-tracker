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

router.route('/').get((req, res) => {
    StrengthExercise.find()
        .then(se => res.json(se))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Existing imports and routes...

// Delete a strength exercise
router.delete('/:id', async (req, res) => {
    try {
      await StrengthExercise.findByIdAndDelete(req.params.id);
      res.json('Strength Exercise deleted.');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

  // GET route to retrieve a StrengthExercise by ID
router.get('/:id', async (req, res) => {
    try {
      const exercise = await StrengthExercise.findById(req.params.id);
      
      if (!exercise) {
        return res.status(404).json('Strength Exercise not found.');
      }
  
      res.json(exercise);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });
  
  // Update a strength exercise
  router.post('/update/:id', async (req, res) => {
    try {
      const exercise = await StrengthExercise.findById(req.params.id);
  
      if (!exercise) return res.status(404).json('Strength Exercise not found');
  
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
