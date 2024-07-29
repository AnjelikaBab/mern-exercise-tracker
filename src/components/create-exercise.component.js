import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutName: '',
      workoutType: '',
      description: '',
      duration: 0,
      date: new Date(),
      workouts: [],
      incline: '',
      distance: '',
      speed: '',
      time: '',
      sets: [{ weight: '', reps: '' }]
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/name/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            workouts: response.data.map(workout => workout.workoutName),
            workoutName: response.data[0].workoutName
          }, this.fetchWorkoutType);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchWorkoutType() {
    axios.get(`http://localhost:5001/name/${this.state.workoutName}`)
      .then(response => {
        this.setState({
          workoutType: response.data.workoutType
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeWorkoutName(e) {
    this.setState({
      workoutName: e.target.value
    }, this.fetchWorkoutType);
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onChangeSets(index, e) {
    const { name, value } = e.target;
    const sets = [...this.state.sets];
    sets[index][name] = value;
    this.setState({ sets });
  }

  addSet() {
    this.setState(prevState => ({
      sets: [...prevState.sets, { weight: '', reps: '' }]
    }));
  }

  removeSet(index) {
    this.setState(prevState => ({
      sets: prevState.sets.filter((_, i) => i !== index)
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      workoutName: this.state.workoutName,
      workoutType: this.state.workoutType,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      incline: this.state.incline,
      distance: this.state.distance,
      speed: this.state.speed,
      time: this.state.time,
      sets: this.state.sets
    };

    console.log(exercise);

    axios.post('http://localhost:5001/exercises/add', exercise)
      .then(res => console.log(res.data))
      .catch(err => console.error('Error: ' + err));
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Workout Name: </label>
            <select
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
  
          {this.state.workoutType === 'Cardio' && (
            <>
              <div className="form-group">
                <label>Incline: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.incline}
                  onChange={e => this.setState({ incline: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Distance: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.distance}
                  onChange={e => this.setState({ distance: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Speed: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.speed}
                  onChange={e => this.setState({ speed: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Time: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.time}
                  onChange={e => this.setState({ time: e.target.value })}
                />
              </div>
            </>
          )}
  
          {this.state.workoutType === 'Strength' && (
            <>
              {this.state.sets.map((set, index) => (
                <div key={index} className="form-group">
                  <label>Set {index + 1}</label>
                  <div className="form-row">
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="weight"
                        placeholder="Weight"
                        value={set.weight}
                        onChange={e => this.onChangeSets(index, e)}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="reps"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={e => this.onChangeSets(index, e)}
                      />
                    </div>
                    <div className="col">
                      <button type="button" onClick={() => this.removeSet(index)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group">
                <button type="button" onClick={this.addSet}>Add Set</button>
              </div>
            </>
          )}
  
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
    );
  }
}
  