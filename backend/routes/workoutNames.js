const router = require('express').Router();
let Workout = require('../models/workoutName.model');

//first endpoint that  handles incoming http get requests on the /users url path
router.route('/').get((req, res) => {
    //get all users from database
    Workout.find()
  //return in json format, the users we got from the database
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const workoutName = req.body.workoutName;

  const newWorkout = new Workout({workoutName});

  newWorkout.save()
    .then(() => res.json('Workout Name added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;