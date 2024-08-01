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
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.toggleSortDate = this.toggleSortDate.bind(this);

    this.state = {
      cardioExercises: [],
      strengthExercises: [],
      workoutNames: [],
      maxSets: 0,
      filter: 'Cardio', // Default filter is set to 'Cardio'
      selectedWorkoutName: '', // Default workout name filter is empty
      sortDateAsc: true // Default sorting order is ascending
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/cardioExercises/')
      .then(response => {
        const cardioExercises = response.data;
        this.setState({ cardioExercises });
        this.setWorkoutNames(cardioExercises, this.state.strengthExercises);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:5001/strengthExercises/')
      .then(response => {
        const strengthExercises = response.data;
        const maxSets = Math.max(...strengthExercises.map(exercise => exercise.sets.length), 0);
        this.setState({ strengthExercises, maxSets });
        this.setWorkoutNames(this.state.cardioExercises, strengthExercises);
      })
      .catch(error => {
        console.log(error);
      });
  }

  setWorkoutNames(cardioExercises, strengthExercises) {
    const workoutNames = new Set();
    cardioExercises.forEach(exercise => workoutNames.add(exercise.workoutName));
    strengthExercises.forEach(exercise => workoutNames.add(exercise.workoutName));
    this.setState({ workoutNames: Array.from(workoutNames) });
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
    let exercises = this.state.cardioExercises
      .filter(exercise => !this.state.selectedWorkoutName || exercise.workoutName === this.state.selectedWorkoutName);

    exercises.sort((a, b) => this.state.sortDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    return exercises.map(currentExercise => {
      return <CardioExercise exercise={currentExercise} deleteExercise={this.deleteCardioExercise} key={currentExercise._id} />;
    });
  }

  strengthExerciseList() {
    let exercises = this.state.strengthExercises
      .filter(exercise => !this.state.selectedWorkoutName || exercise.workoutName === this.state.selectedWorkoutName);

    exercises.sort((a, b) => this.state.sortDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    return exercises.map(currentExercise => (
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

  onChangeFilter(e) {
    this.setState({ filter: e.target.value, selectedWorkoutName: '' });
  }

  onChangeWorkoutName(e) {
    this.setState({ selectedWorkoutName: e.target.value });
  }

  toggleSortDate() {
    this.setState(prevState => ({ sortDateAsc: !prevState.sortDateAsc }));
  }

  render() {
    const filteredWorkoutNames = this.state.filter === 'Cardio'
      ? this.state.cardioExercises.map(exercise => exercise.workoutName)
      : this.state.strengthExercises.map(exercise => exercise.workoutName);

    return (
      <div>
        <h3>Filter Exercises</h3>
        <div className="form-group">
          <label>Exercise Type: </label>
          <select
            required
            className="form-control"
            value={this.state.filter}
            onChange={this.onChangeFilter}
          >
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
          </select>
        </div>

        <div className="form-group">
          <label>Workout Name: </label>
          <select
            className="form-control"
            value={this.state.selectedWorkoutName}
            onChange={this.onChangeWorkoutName}
          >
            <option value="">All</option>
            {filteredWorkoutNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {this.state.filter === 'Cardio' && (
          <div>
            <h3>Cardio Exercises</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Workout Name</th>
                  <th onClick={this.toggleSortDate} style={{ cursor: 'pointer' }}>Date {this.state.sortDateAsc ? '↑' : '↓'}</th>
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
          </div>
        )}

        {this.state.filter === 'Strength' && (
          <div>
            <h3>Strength Exercises</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Workout Name</th>
                    <th onClick={this.toggleSortDate} style={{ cursor: 'pointer' }}>Date {this.state.sortDateAsc ? '↑' : '↓'}</th>
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
        )}
      </div>
    );
  }
}
