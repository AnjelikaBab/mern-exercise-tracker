import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateWorkoutName from "./components/create-workoutName.component";
import Login from './components/login.component';
import SignUp from './components/sign-up.component';
import PrivateRoute from './components/private-route'; // Import the PrivateRoute component

const App = ({ location }) => {
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="container">
      {!isAuthPage && <Navbar />} {/* Render Navbar only if not on login or signup page */}
      <br />
      <Switch>
        <PrivateRoute path="/" exact component={ExercisesList} />
        <PrivateRoute path="/edit-cardio/:id" component={props => <EditExercise {...props} type="cardioExercises" />} />
        <PrivateRoute path="/edit-strength/:id" component={props => <EditExercise {...props} type="strengthExercises" />} />
        <PrivateRoute path="/create" component={CreateExercise} />
        <PrivateRoute path="/name" component={CreateWorkoutName} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

const AppWrapper = (props) => {
  return (
    <Router>
      <Route path="/" render={(routeProps) => <App {...routeProps} />} />
    </Router>
  );
};

export default AppWrapper;
