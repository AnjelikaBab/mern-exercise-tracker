const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Check if model already exists to avoid redefining
const CardioExercise = mongoose.models.CardioExercise || mongoose.model('CardioExercise', new Schema({
  workoutName: { type: String, required: true },
  date: { type: Date, required: true },
  incline: { type: String, required: false },
  distance: { type: String, required: false },
  speed: { type: String, required: false },
  time: { type: String, required: true }
}));

module.exports = CardioExercise;
