import React, { Component } from 'react';
import axios from 'axios';

export default class CreateWorkoutName extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutName: ''
    }
  }

  onChangeWorkoutName(e) {
    this.setState({
      workoutName: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const wname = {
      workoutName: this.state.workoutName
    }

    console.log(wname);

    axios.post('http://localhost:5001/name/add', wname)
      .then(res => console.log(res.data))
      .catch(err => console.error('Error: ' + err)); 

    this.setState({
      workoutName: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Add new workouts</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Workout Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.workoutName}
                onChange={this.onChangeWorkoutName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}