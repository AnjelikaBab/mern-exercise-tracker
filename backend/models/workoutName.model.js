const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutNameSchema = new Schema({
  workoutName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2
  },
}, {
  timestamps: true,
});

const Workout = mongoose.model('workout', workoutNameSchema);

module.exports = Workout;