const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Check if model already exists to avoid redefining
const StrengthExercise = mongoose.models.StrengthExercise || mongoose.model('StrengthExercise', new Schema({
  workoutName: { type: String, required: true },
  date: { type: Date, required: true },
  sets: [{
    weight: { type: String, required: true },
    reps: { type: String, required: true }
  }]
}));

module.exports = StrengthExercise;
