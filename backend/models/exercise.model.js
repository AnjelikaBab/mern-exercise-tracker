const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Base exercise schema
const baseExerciseSchema = new Schema({
  workoutName: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

// Cardio exercise schema
const cardioExerciseSchema = new Schema({
  incline: { type: Number, required: false }, // Additional field for cardio
  distance: { type: Number, required: true }, // Additional field for cardio
  speed: { type: Number, required: true }, // Additional field for cardio
  time: { type: Number, required: true }, // Additional field for cardio
}, {
  timestamps: true,
});

// Strength exercise schema
const strengthExerciseSchema = new Schema({
  sets: [{
    weight: { type: Number, required: true },
    reps: { type: Number, required: true }
  }]
}, {
  timestamps: true,
});

// Merge base schema with specific schemas
cardioExerciseSchema.add(baseExerciseSchema);
strengthExerciseSchema.add(baseExerciseSchema);

// Create models
const CardioExercise = mongoose.model('CardioExercise', cardioExerciseSchema);
const StrengthExercise = mongoose.model('StrengthExercise', strengthExerciseSchema);

module.exports = { CardioExercise, StrengthExercise };
