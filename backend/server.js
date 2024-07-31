const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//have environment variables in the dotenv file
require('dotenv').config();

//create express server with port 5001
const app = express();
const port = process.env.PORT || 5001;

//middleware, allows to parse json, servers sends and recieves json
app.use(cors());
app.use(express.json());

//database uri, recieved from moongoDB dashboard. Starts connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
const workoutNamesRouter = require('./routes/workoutNames');

// Import routes
const cardioExercisesRouter = require('./routes/cardioExercises');
const strengthExercisesRouter = require('./routes/strengthExercises');

// Use routes with specified URLs
app.use('/cardioExercises', cardioExercisesRouter);
app.use('/strengthExercises', strengthExercisesRouter);

//loads these files with specified url
// app.use('/exercises', exercisesRouter);
app.use('/name', workoutNamesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
