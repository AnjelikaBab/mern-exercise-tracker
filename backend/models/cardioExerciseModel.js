const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Check if model already exists to avoid redefining
const CardioExercise = mongoose.models.CardioExercise || mongoose.model('CardioExercise', new Schema({
  workoutName: { type: String, required: true },
  date: { type: Date, required: true },
  incline: { type: Number, required: false },
  distance: { type: Number, required: true },
  speed: { type: Number, required: true },
  time: { type: Number, required: true }
}));

module.exports = CardioExercise;
