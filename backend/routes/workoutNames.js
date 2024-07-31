const router = require('express').Router();
const Workout = require('../models/workoutName.model');

// Get all workouts
router.route('/').get((req, res) => {
    Workout.find()
        .then(workouts => res.json(workouts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get workout by name
router.route('/:workoutName').get((req, res) => {
    const { workoutName } = req.params;
    Workout.findOne({ workoutName })
        .then(workout => {
            if (!workout) {
                return res.status(404).json('Workout not found');
            }
            res.json(workout);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete workout by name
router.delete('/:workoutName', (req, res) => {
  Workout.findOneAndDelete({ workoutName: req.params.workoutName })
    .then(() => res.json('Workout deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Add new workout
router.route('/add').post((req, res) => {
    const { workoutName, workoutType } = req.body;
    const newWorkout = new Workout({ workoutName, workoutType });

    newWorkout.save()
        .then(() => res.json('Workout Name added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
