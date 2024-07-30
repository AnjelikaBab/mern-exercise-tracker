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

const StrengthExercise = props => (
  <tr>
    <td>{props.exercise.workoutName}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    {props.exercise.sets.map((set, index) => (
      <React.Fragment key={index}>
        <td>{set.weight}</td>
        <td>{set.reps}</td>
      </React.Fragment>
    ))}
    <td>
      <Link to={"/edit-strength/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
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
      strengthExercises: []
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
        this.setState({ strengthExercises: response.data });
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
    return this.state.strengthExercises.map(currentExercise => {
      return <StrengthExercise exercise={currentExercise} deleteExercise={this.deleteStrengthExercise} key={currentExercise._id} />;
    });
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workout Name</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Reps</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.strengthExerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}
