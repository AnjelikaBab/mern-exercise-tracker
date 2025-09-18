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

router.route('/').get((req, res) => {
    CardioExercise.find()
        .then(ce => res.json(ce))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Existing imports and routes...

// Delete a cardio exercise
router.delete('/:id', async (req, res) => {
    try {
      await CardioExercise.findByIdAndDelete(req.params.id);
      res.json('Cardio Exercise deleted.');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

  // GET route to retrieve a CardioExercise by ID
router.get('/:id', async (req, res) => {
    try {
      const exercise = await CardioExercise.findById(req.params.id);
      
      if (!exercise) {
        return res.status(404).json('Cardio Exercise not found.');
      }
  
      res.json(exercise);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });
  
  // Update a cardio exercise
  router.post('/update/:id', async (req, res) => {
    try {
      const exercise = await CardioExercise.findById(req.params.id);
  
      if (!exercise) return res.status(404).json('Cardio Exercise not found');
  
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
