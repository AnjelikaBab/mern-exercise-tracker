import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CardioExercise = props => (
  <tr>
    <td>{props.exercise.workoutName}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>{props.exercise.incline}</td>
    <td>{props.exercise.distance}</td>
    <td>{props.exercise.speed}</td>
    <td>{props.exercise.time}</td>
    <td>
      <Link to={"/edit-cardio/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
);

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteCardioExercise = this.deleteCardioExercise.bind(this);
    this.deleteStrengthExercise = this.deleteStrengthExercise.bind(this);

    this.state = {
      cardioExercises: [],
      strengthExercises: [],
      maxSets: 0
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/cardioExercises/')
      .then(response => {
        this.setState({ cardioExercises: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:5001/strengthExercises/')
      .then(response => {
        const strengthExercises = response.data;
        const maxSets = Math.max(...strengthExercises.map(exercise => exercise.sets.length), 0);
        this.setState({ strengthExercises, maxSets });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteCardioExercise(id) {
    axios.delete('http://localhost:5001/cardioExercises/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      cardioExercises: this.state.cardioExercises.filter(el => el._id !== id)
    });
  }

  deleteStrengthExercise(id) {
    axios.delete('http://localhost:5001/strengthExercises/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      strengthExercises: this.state.strengthExercises.filter(el => el._id !== id)
    });
  }

  cardioExerciseList() {
    return this.state.cardioExercises.map(currentExercise => {
      return <CardioExercise exercise={currentExercise} deleteExercise={this.deleteCardioExercise} key={currentExercise._id} />;
    });
  }

  strengthExerciseList() {
    return this.state.strengthExercises.map(currentExercise => (
      <tr key={currentExercise._id}>
        <td>{currentExercise.workoutName}</td>
        <td>{new Date(currentExercise.date).toLocaleDateString()}</td>
        {currentExercise.sets.map((set, index) => (
          <td key={index}>
            <div>Weight: {set.weight}</div>
            <div>Reps: {set.reps}</div>
          </td>
        ))}
        {[...Array(Math.max(this.state.maxSets - currentExercise.sets.length, 0))].map((_, index) => (
          <td key={`empty-${index}`}></td>
        ))}
        <td>
          <Link to={"/edit-strength/" + currentExercise._id}>edit</Link> | <a href="#" onClick={() => { this.deleteStrengthExercise(currentExercise._id) }}>delete</a>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <h3>Cardio Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workout Name</th>
              <th>Date</th>
              <th>Incline</th>
              <th>Distance</th>
              <th>Speed</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.cardioExerciseList()}
          </tbody>
        </table>

        <h3>Strength Exercises</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Workout Name</th>
                <th>Date</th>
                {[...Array(this.state.maxSets)].map((_, index) => (
                  <th key={index}>Set {index + 1}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.strengthExerciseList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
