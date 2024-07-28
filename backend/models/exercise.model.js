const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  workoutName: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});
//crud: create read update delete
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;