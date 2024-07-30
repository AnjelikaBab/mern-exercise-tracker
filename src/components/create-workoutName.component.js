import React, { Component } from 'react';
import axios from 'axios';

export default class CreateWorkoutName extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutName: '',
      workoutType: '' // New state for the dropdown selection
    };
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

  onSubmit(e) {
    e.preventDefault();

    const workout = {
      workoutName: this.state.workoutName,
      workoutType: this.state.workoutType // Include the selected workout type
    };

    console.log(workout);

    // Assuming axios is imported and the server is set up to handle this request
    axios.post('http://localhost:5001/name/add', workout)
      .then(res => console.log(res.data))
      .catch(err => console.error('Error: ' + err));

    this.setState({
      workoutName: '',
      workoutType: '' // Reset the dropdown selection
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
              onChange={(e) => this.onChangeWorkoutType(e)}
            >
              <option value="" disabled>Select type</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
