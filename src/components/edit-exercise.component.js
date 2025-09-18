import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import config from '../config';

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
    if (this.props.editData) {
      const { id, type, data } = this.props.editData;
      const workoutType = type === 'cardio' ? 'cardioExercises' : 'strengthExercises';
      
      this.setState({
        id: id,
        workoutType: workoutType,
        workoutName: data.workoutName,
        date: new Date(data.date),
        incline: data.incline || '',
        distance: data.distance || '',
        speed: data.speed || '',
        time: data.time || '',
        sets: data.sets && data.sets.length > 0 ? data.sets : [{ weight: '', reps: '' }]
      });
    }
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
      sets: [...prevState.sets, { weight: '', reps: '' }]
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

    const url = `${config.API_URL}/${this.state.workoutType}/update/${this.state.id}`;
    
    console.log('Updating exercise:', exercise);
    console.log('URL:', url);
    console.log('Workout type:', this.state.workoutType);

    axios.post(url, exercise)
      .then(res => {
        console.log('Update successful:', res.data);
        // Navigate back to home page
        if (this.props.onNavigate) {
          this.props.onNavigate('home');
        }
      })
      .catch(err => {
        console.error('Update error:', err);
        console.error('Error response:', err.response?.data);
      });
  }

  render() {
    return (
      <div>
        <h2 style={{ 
          color: '#2d3748', 
          marginBottom: '2rem', 
          fontSize: '1.8rem',
          fontWeight: '700',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Edit {this.state.workoutType.replace('Exercises', '')} Exercise Log
        </h2>
        <form onSubmit={this.onSubmit} style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#4a5568',
              fontSize: '1rem'
            }}>
              Workout Name
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                fontSize: '1rem',
                backgroundColor: '#f7fafc',
                color: '#4a5568',
                outline: 'none'
              }}
              value={this.state.workoutName}
              readOnly
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#4a5568',
              fontSize: '1rem'
            }}>
              Date
            </label>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              padding: '0.5rem',
              transition: 'all 0.3s ease'
            }}>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          {this.state.workoutType === 'cardioExercises' && (
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600' }}>
                Cardio Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    opacity: 0.9
                  }}>
                    Incline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5%"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    className="placeholder-light"
                    value={this.state.incline}
                    onChange={this.onChangeIncline}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    opacity: 0.9
                  }}>
                    Distance
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5km"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    className="placeholder-light"
                    value={this.state.distance}
                    onChange={this.onChangeDistance}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    opacity: 0.9
                  }}>
                    Speed
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10 km/h"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    className="placeholder-light"
                    value={this.state.speed}
                    onChange={this.onChangeSpeed}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    opacity: 0.9
                  }}>
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 30 min"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    className="placeholder-light"
                    value={this.state.time}
                    onChange={this.onChangeTime}
                    onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
              </div>
            </div>
          )}
          {this.state.workoutType === 'strengthExercises' && (
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600' }}>
                Strength Details
              </h4>
              {this.state.sets.map((set, index) => (
                <div key={index} style={{ 
                  marginBottom: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    opacity: 0.9
                  }}>
                    Set {index + 1}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', alignItems: 'end' }}>
                    <div>
                      <input
                        type="text"
                        name="weight"
                        placeholder="Weight (kg)"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '1rem',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        className="placeholder-light"
                        value={set.weight}
                        onChange={e => this.onChangeSet(index, 'weight', e.target.value)}
                        onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="reps"
                        placeholder="Reps"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '1rem',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        className="placeholder-light"
                        value={set.reps}
                        onChange={e => this.onChangeSet(index, 'reps', e.target.value)}
                        onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => this.onRemoveSet(index)}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.3)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.2)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={this.onAddSet}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Add Set
              </button>
            </div>
          )}
          
          <div style={{ textAlign: 'center' }}>
            <button 
              type="submit" 
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}
            >
              Update Exercise Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}
