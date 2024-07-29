const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  workoutName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2
  },
  workoutType: {
    type: String,
    required: true,
    enum: ['Cardio', 'Strength'] // Validating workout types to be either 'Cardio' or 'Strength'
  }
}, {
  timestamps: true,
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
