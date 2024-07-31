// const router = require('express').Router();
// const { CardioExercise, StrengthExercise } = require('../models/exercise.model');

// router.route('/').get((req, res) => {
//   Promise.all([
//     CardioExercise.find(),
//     StrengthExercise.find()
//   ])
//     .then(([cardioExercises, strengthExercises]) => res.json([...cardioExercises, ...strengthExercises]))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const { workoutName, date, workoutType } = req.body;
//   const newExerciseData = { workoutName, date: Date.parse(date) };

//   let newExercise;
//   if (workoutType === 'cardio') {
//     const { incline, distance, speed, time } = req.body;
//     newExerciseData.incline = incline;
//     newExerciseData.distance = distance;
//     newExerciseData.speed = speed;
//     newExerciseData.time = time;
//     newExercise = new CardioExercise(newExerciseData);
//   } else if (workoutType === 'strength') {
//     const { sets } = req.body;
//     newExerciseData.sets = sets;
//     newExercise = new StrengthExercise(newExerciseData);
//   }

//   newExercise.save()
//     .then(() => res.json('Exercise added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
//   Promise.any([
//     CardioExercise.findById(req.params.id),
//     StrengthExercise.findById(req.params.id)
//   ])
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Promise.any([
//     CardioExercise.findByIdAndDelete(req.params.id),
//     StrengthExercise.findByIdAndDelete(req.params.id)
//   ])
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   const { workoutName, date, workoutType } = req.body;
//   const updateData = { workoutName, date: Date.parse(date) };

//   const updateExercise = (ExerciseModel) => {
//     ExerciseModel.findById(req.params.id)
//       .then(exercise => {
//         if (!exercise) throw new Error('Exercise not found');

//         if (workoutType === 'cardio') {
//           const { incline, distance, speed, time } = req.body;
//           exercise.incline = incline;
//           exercise.distance = distance;
//           exercise.speed = speed;
//           exercise.time = time;
//         } else if (workoutType === 'strength') {
//           const { sets } = req.body;
//           exercise.sets = sets;
//         }

//         exercise.workoutName = workoutName;
//         exercise.date = Date.parse(date);

//         return exercise.save();
//       })
//       .then(() => res.json('Exercise updated!'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   };

//   if (workoutType === 'cardio') {
//     updateExercise(CardioExercise);
//   } else if (workoutType === 'strength') {
//     updateExercise(StrengthExercise);
//   } else {
//     res.status(400).json('Error: Invalid workout type');
//   }
// });

// module.exports = router;
