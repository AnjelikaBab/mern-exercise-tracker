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
      <div className="space-y-8">
        {/* Add New Workouts Section */}
        <div className="bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20">
          <h3 className="text-gray-800 mb-6 text-2xl font-bold text-center">
            Add New Workouts
          </h3>
          <form onSubmit={this.onSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-600 text-base">
                Workout Name:
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base bg-white transition-all duration-300 outline-none focus:border-blue-500"
                value={this.state.workoutName}
                onChange={this.onChangeWorkoutName}
                placeholder="Enter workout name"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-600 text-base">
                Workout Type:
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base bg-white transition-all duration-300 outline-none focus:border-blue-500"
                value={this.state.workoutType}
                onChange={this.onChangeWorkoutType}
              >
                <option value="" disabled>Select type</option>
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
              </select>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              >
                Add Workout
              </button>
            </div>
          </form>
        </div>

        {/* Remove Workouts Section */}
        <div className="bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20">
          <h3 className="text-gray-800 mb-6 text-2xl font-bold text-center">
            Remove Workouts
          </h3>
          <form onSubmit={this.onRemove} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-600 text-base">
                Select Workout to Remove:
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base bg-white transition-all duration-300 outline-none focus:border-red-500"
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
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-red-500 to-red-600 text-white border-none px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              >
                Remove Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
