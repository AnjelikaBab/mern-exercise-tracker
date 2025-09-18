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
  
    // Initialize the base exercise object
    let exercise = {
      workoutName: this.state.workoutName,
      date: this.state.date
    };
  
    // Conditionally add fields based on workout type
    if (this.state.workoutType === 'Cardio') {
      exercise = {
        ...exercise,
        incline: this.state.incline,
        distance: this.state.distance,
        speed: this.state.speed,
        time: this.state.time
      };
  
      // URL for Cardio exercises
      var url = 'http://localhost:5001/cardioExercises/add';
  
    } else if (this.state.workoutType === 'Strength') {
      exercise = {
        ...exercise,
        sets: this.state.sets
      };
  
      // URL for Strength exercises
      var url = 'http://localhost:5001/strengthExercises/add';
  
    } else {
      console.error('Unknown workout type');
      return;
    }
  
    console.log(exercise);
  
    axios.post(url, exercise)
      .then(res => console.log(res.data))
      .catch(err => console.error('Error: ' + err));

      // Navigate back to home page
      if (this.props.onNavigate) {
        this.props.onNavigate('home');
      }
  }
  

  render() {
    console.log('CreateExercise component rendering');
    return (
      <div>
        <h2 className="text-gray-800 mb-8 text-3xl font-bold text-center flex items-center justify-center gap-2">
          Create New Exercise Log
        </h2>
        <form onSubmit={this.onSubmit} className="bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-600 text-base">
              Workout Name
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base bg-white transition-all duration-300 outline-none focus:border-blue-500"
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
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl mb-6 text-white">
              <h4 className="m-0 mb-4 text-xl font-semibold">
                Cardio Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-sm opacity-90">
                    Incline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5%"
                    className="w-full px-4 py-3 rounded-lg border-none text-base bg-white/20 text-white outline-none transition-all duration-300 focus:bg-white/30 placeholder-light"
                    value={this.state.incline}
                    onChange={e => this.setState({ incline: e.target.value })}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm opacity-90">
                    Distance
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5km"
                    className="w-full px-4 py-3 rounded-lg border-none text-base bg-white/20 text-white outline-none transition-all duration-300 focus:bg-white/30 placeholder-light"
                    value={this.state.distance}
                    onChange={e => this.setState({ distance: e.target.value })}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm opacity-90">
                    Speed
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10 km/h"
                    className="w-full px-4 py-3 rounded-lg border-none text-base bg-white/20 text-white outline-none transition-all duration-300 focus:bg-white/30 placeholder-light"
                    value={this.state.speed}
                    onChange={e => this.setState({ speed: e.target.value })}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm opacity-90">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 30 min"
                    className="w-full px-4 py-3 rounded-lg border-none text-base bg-white/20 text-white outline-none transition-all duration-300 focus:bg-white/30 placeholder-light"
                    value={this.state.time}
                    onChange={e => this.setState({ time: e.target.value })}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
              </div>
            </div>
          )}
  
          {this.state.workoutType === 'Strength' && (
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl mb-6 text-white">
              <h4 className="m-0 mb-4 text-xl font-semibold">
                Strength Details
              </h4>
              {this.state.sets.map((set, index) => (
                <div key={index} className="mb-4 bg-white/10 p-4 rounded-lg">
                  <label className="block mb-2 font-medium text-sm opacity-90">
                    Set {index + 1}
                  </label>
                  <div className='grid grid-cols-[1fr_1fr_auto] gap-2 items-end'>
                    <div>
                      <input
                        type="text"
                        name="weight"
                        placeholder="Weight (kg)"
                        className="w-full px-4 py-3 rounded-lg border-none text-base bg-white/20 text-white outline-none transition-all duration-300 focus:bg-white/30 placeholder-light"
                        value={set.weight}
                        onChange={e => this.onChangeSets(index, e)}
                        onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="reps"
                        placeholder="Reps"
                        className="w-full px-4 py-3 rounded-lg border-none text-base bg-white/20 text-white outline-none transition-all duration-300 focus:bg-white/30 placeholder-light"
                        value={set.reps}
                        onChange={e => this.onChangeSets(index, e)}
                        onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => this.removeSet(index)}
                      className="bg-white/20 border border-white/30 text-white px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={this.addSet}
                className="bg-white/20 border border-white/30 text-white px-6 py-3 rounded-lg cursor-pointer text-base font-medium transition-all duration-300 w-full hover:bg-white/30 hover:-translate-y-0.5"
              >
                Add Set
              </button>
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-600 text-base">
              Date
            </label>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-2 transition-all duration-300">
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                className="w-full border-none outline-none"
              />
            </div>
          </div>
          
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl min-w-[200px]"
            >
              Create Exercise Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}
  