import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.workoutName}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | 
      <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
);

const StrengthExercise = props => (
  <tr>
    <td>{props.exercise.workoutName}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Set</th>
            <th>Weight</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {props.exercise.sets.map((set, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{set.weight}</td>
              <td>{set.reps}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | 
      <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      cardioExercises: [],
      strengthExercises: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/exercises/')
      .then(response => {
        const exercises = response.data;
        this.setState({
          cardioExercises: exercises.filter(exercise => exercise.workoutType === 'Cardio'),
          strengthExercises: exercises.filter(exercise => exercise.workoutType === 'Strength')
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5001/exercises/'+id)
      .then(response => { console.log(response.data) });

    this.setState(prevState => ({
      cardioExercises: prevState.cardioExercises.filter(el => el._id !== id),
      strengthExercises: prevState.strengthExercises.filter(el => el._id !== id)
    }));
  }

  exerciseList(exercises, isStrength = false) {
    return exercises.map(currentexercise => {
      if (isStrength) {
        return <StrengthExercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
      }
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>

        <h4>Cardio Exercises</h4>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workout Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList(this.state.cardioExercises)}
          </tbody>
        </table>

        <h4>Strength Exercises</h4>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workout Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Sets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList(this.state.strengthExercises, true)}
          </tbody>
        </table>
      </div>
    );
  }
}
