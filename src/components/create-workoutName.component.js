import React, { Component } from 'react';
import axios from 'axios';

export default class CreateWorkoutName extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.onChangeWorkoutType = this.onChangeWorkoutType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeWorkoutToRemove = this.onChangeWorkoutToRemove.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      workoutName: '',
      workoutType: '', // New state for the dropdown selection
      workouts: [],
      workoutToRemove: '' // State to store the selected workout name for removal
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/name/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            workouts: response.data.map(workout => workout.workoutName),
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeWorkoutName(e) {
    this.setState({
      workoutName: e.target.value
    });
  }

  onChangeWorkoutType(e) {
    this.setState({
      workoutType: e.target.value
    });
  }

  onChangeWorkoutToRemove(e) {
    this.setState({
      workoutToRemove: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const workout = {
      workoutName: this.state.workoutName,
      workoutType: this.state.workoutType // Include the selected workout type
    };

    console.log(workout);

    axios.post('http://localhost:5001/name/add', workout)
      .then(res => {
        console.log(res.data);
        this.componentDidMount(); // Refresh the list of workouts
      })
      .catch(err => console.error('Error: ' + err));

    this.setState({
      workoutName: '',
      workoutType: '' // Reset the dropdown selection
    });
  }

  onRemove(e) {
    e.preventDefault();

    axios.delete(`http://localhost:5001/name/${this.state.workoutToRemove}`)
      .then(res => {
        console.log(res.data);
        this.componentDidMount(); // Refresh the list of workouts
      })
      .catch(err => console.error('Error: ' + err));

    this.setState({
      workoutToRemove: '' // Reset the dropdown selection
    });
  }

  render() {
    return (
      <div>
        <h3>Add New Workouts</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Workout Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.workoutName}
              onChange={this.onChangeWorkoutName}
            />
          </div>
          <div className="form-group">
            <label>Workout Type: </label>
            <select
              required
              className="form-control"
              value={this.state.workoutType}
              onChange={this.onChangeWorkoutType}
            >
              <option value="" disabled>Select type</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="customBtn" />
          </div>
        </form>
        <h3>Remove Workouts</h3>
        <form onSubmit={this.onRemove}>
          <div className="form-group">
            <label>Select Workout to Remove: </label>
            <select
              required
              className="form-control"
              value={this.state.workoutToRemove}
              onChange={this.onChangeWorkoutToRemove}
            >
              <option value="" disabled>Select workout</option>
              {this.state.workouts.map(workout => (
                <option key={workout} value={workout}>
                  {workout}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Remove" className="customBtn" />
          </div>
        </form>
      </div>
    );
  }
}
