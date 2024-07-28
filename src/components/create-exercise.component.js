import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    //always call super under constructor
    super(props);

    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //how you create variables in react is state
    this.state = {
      workoutName: '',
      description: '',
      duration: 0,
      date: new Date(),
      workouts: []
    }
  }

  //right before anything
  componentDidMount() {
    axios.get('http://localhost:5001/name/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            workouts: response.data.map(workout => workout.workoutName),
            workoutName: response.data[0].workoutName
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeWorkoutName(e) {
    this.setState({
        workoutName: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    //prevent default html behaviour 
    e.preventDefault();

    console.log('Form submitted');

    const exercise = {
      workoutName: this.state.workoutName,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    axios.post('http://localhost:5001/exercises/add', exercise)
    .then(res => console.log(res.data));

  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Workout Name: </label>
          <select
              ref={this.userInputRef} // Use the ref created with createRef
              required
              className="form-control"
              value={this.state.workoutName}
              onChange={this.onChangeWorkoutName}
            >
              {this.state.workouts.map(workout => (
                <option key={workout} value={workout}>
                  {workout}
                </option>
              ))}
            </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}