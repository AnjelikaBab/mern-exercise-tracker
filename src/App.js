import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";



import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateWorkoutName from "./components/create-workoutName.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit-cardio/:id" component={props => <EditExercise {...props} type="cardioExercises" />} />
      <Route path="/edit-strength/:id" component={props => <EditExercise {...props} type="strengthExercises" />} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/name" component={CreateWorkoutName} />
      </div>
    </Router>
  );
}

export default App;