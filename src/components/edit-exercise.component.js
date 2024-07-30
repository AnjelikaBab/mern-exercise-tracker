import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeIncline = this.onChangeIncline.bind(this);
    this.onChangeDistance = this.onChangeDistance.bind(this);
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeSet = this.onChangeSet.bind(this);
    this.onAddSet = this.onAddSet.bind(this);
    this.onRemoveSet = this.onRemoveSet.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutName: '',
      workoutType: '',
      date: new Date(),
      incline: '',
      distance: '',
      speed: '',
      time: '',
      sets: [{ weight: '', reps: '' }]
    };
  }

  componentDidMount() {
    console.log(this.state.workoutName)
    const { id } = this.props.match.params;
    const currentUrl = window.location.pathname;
    let type;

    if (currentUrl.includes('/edit-cardio/')) {
      type = 'cardioExercises';
    } else if (currentUrl.includes('/edit-strength/')) {
      type = 'strengthExercises';
    }

    this.setState({ workoutType: type }, () => {
      axios.get(`http://localhost:5001/${this.state.workoutType}/${id}`)
        .then(response => {
          const data = response.data;
          this.setState({
            workoutName: data.workoutName,
            date: new Date(data.date),
            incline: data.incline || '',
            distance: data.distance || '',
            speed: data.speed || '',
            time: data.time || '',
            sets: data.sets || [{ weight: '', reps: '' }]
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  onChangeDate(date) {
    this.setState({ date: date });
  }

  onChangeIncline(e) {
    this.setState({ incline: e.target.value });
  }

  onChangeDistance(e) {
    this.setState({ distance: e.target.value });
  }

  onChangeSpeed(e) {
    this.setState({ speed: e.target.value });
  }

  onChangeTime(e) {
    this.setState({ time: e.target.value });
  }

  onChangeSet(index, key, value) {
    const sets = [...this.state.sets];
    sets[index][key] = value;
    this.setState({ sets });
  }

  onAddSet() {
    this.setState(prevState => ({
      sets: [...prevState.sets, { weight: 0, reps: 0 }]
    }));
  }

  onRemoveSet(index) {
    this.setState(prevState => ({
      sets: prevState.sets.filter((set, i) => i !== index)
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    let exercise = {
      workoutName: this.state.workoutName,
      date: this.state.date
    };

    if (this.state.workoutType === 'cardioExercises') {
      exercise = {
        ...exercise,
        incline: this.state.incline,
        distance: this.state.distance,
        speed: this.state.speed,
        time: this.state.time
      };
    } else if (this.state.workoutType === 'strengthExercises') {
      exercise = {
        ...exercise,
        sets: this.state.sets
      };
    } else {
      console.error('Unknown workout type');
      return;
    }

    const url = `http://localhost:5001/${this.state.workoutType}/update/${this.props.match.params.id}`;

    axios.post(url, exercise)
      .then(res => console.log(res.data))
      .catch(err => console.error('Error: ' + err));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3 >Edit {this.state.workoutType.replace('Exercises', '')} Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Workout Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.workoutName}
              readOnly // Makes the input field read-only
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
          {this.state.workoutType === 'cardioExercises' && (
            <>
              <div className="form-group">
                <label>Incline: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.incline}
                  onChange={this.onChangeIncline}
                />
              </div>
              <div className="form-group">
                <label>Distance: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.distance}
                  onChange={this.onChangeDistance}
                />
              </div>
              <div className="form-group">
                <label>Speed: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.speed}
                  onChange={this.onChangeSpeed}
                />
              </div>
              <div className="form-group">
                <label>Time: </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.time}
                  onChange={this.onChangeTime}
                />
              </div>
            </>
          )}
          {this.state.workoutType === 'strengthExercises' && (
            <>
              {this.state.sets.map((set, index) => (
                <div key={index} className="form-group">
                  <label>Set {index + 1}</label>
                  <div>
                    <input
                      type="number"
                      placeholder="Weight"
                      className="form-control"
                      value={set.weight}
                      onChange={e => this.onChangeSet(index, 'weight', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Reps"
                      className="form-control"
                      value={set.reps}
                      onChange={e => this.onChangeSet(index, 'reps', e.target.value)}
                    />
                    <button type="button" onClick={() => this.onRemoveSet(index)}>Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={this.onAddSet}>Add Set</button>
            </>
          )}
          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}