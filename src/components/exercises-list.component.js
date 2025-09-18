import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

const CardioExercise = props => (
  <div style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '1.5rem',
    color: 'white',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
  }}
  >
    <div style={{
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100px',
      height: '100px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '50%',
      transform: 'translate(30px, -30px)'
    }}></div>
    
    <div style={{ position: 'relative', zIndex: 1 }}>
      <h4 style={{ 
        margin: '0 0 1rem 0', 
        fontSize: '1.2rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {props.exercise.workoutName}
      </h4>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Date</div>
          <div style={{ fontWeight: '600' }}>{props.exercise.date.substring(0, 10)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Incline</div>
          <div style={{ fontWeight: '600' }}>{props.exercise.incline || 'N/A'}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Distance</div>
          <div style={{ fontWeight: '600' }}>{props.exercise.distance || 'N/A'}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Speed</div>
          <div style={{ fontWeight: '600' }}>{props.exercise.speed || 'N/A'}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Time</div>
          <div style={{ fontWeight: '600' }}>{props.exercise.time || 'N/A'}</div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem',
        justifyContent: 'flex-end'
      }}>
        <button 
          onClick={() => { 
            console.log('Edit button clicked for cardio exercise:', props.exercise._id);
            props.editExercise(props.exercise._id, 'cardio'); 
          }}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '0.5rem 1rem',
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
          Edit
        </button>
        <button 
          onClick={() => { props.deleteExercise(props.exercise._id) }}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '0.5rem 1rem',
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
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteCardioExercise = this.deleteCardioExercise.bind(this);
    this.deleteStrengthExercise = this.deleteStrengthExercise.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
    this.toggleSortDate = this.toggleSortDate.bind(this);
    this.editExercise = this.editExercise.bind(this);

    this.state = {
      cardioExercises: [],
      strengthExercises: [],
      workoutNames: [],
      maxSets: 0,
      filter: 'All', // Default filter is set to 'All'
      selectedWorkoutName: '', // Default workout name filter is empty
      sortDateAsc: true // Default sorting order is ascending
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    // Refresh data when navigating back to this component
    if (prevProps.location !== this.props.location) {
      this.loadData();
    }
  }

  loadData() {
    axios.get(`${config.API_URL}/cardioExercises/`)
      .then(response => {
        const cardioExercises = response.data;
        this.setState({ cardioExercises });
        this.setWorkoutNames(cardioExercises, this.state.strengthExercises);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`${config.API_URL}/strengthExercises/`)
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
    axios.delete(`${config.API_URL}/cardioExercises/` + id)
      .then(response => { console.log(response.data) });

    this.setState({
      cardioExercises: this.state.cardioExercises.filter(el => el._id !== id)
    });
  }

  deleteStrengthExercise(id) {
    axios.delete(`${config.API_URL}/strengthExercises/` + id)
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
      return <CardioExercise exercise={currentExercise} deleteExercise={this.deleteCardioExercise} editExercise={this.editExercise} key={currentExercise._id} />;
    });
  }

  allExercisesList() {
    // Get filtered cardio exercises
    let cardioExercises = this.state.cardioExercises
      .filter(exercise => !this.state.selectedWorkoutName || exercise.workoutName === this.state.selectedWorkoutName);

    // Get filtered strength exercises  
    let strengthExercises = this.state.strengthExercises
      .filter(exercise => !this.state.selectedWorkoutName || exercise.workoutName === this.state.selectedWorkoutName);

    console.log('All exercises filtering:', {
      selectedWorkoutName: this.state.selectedWorkoutName,
      cardioCount: cardioExercises.length,
      strengthCount: strengthExercises.length,
      totalCardio: this.state.cardioExercises.length,
      totalStrength: this.state.strengthExercises.length
    });

    // Debug strength exercise workout names
    if (this.state.selectedWorkoutName) {
      console.log('Strength exercises before filtering:');
      this.state.strengthExercises.forEach((exercise, index) => {
        console.log(`${index}: "${exercise.workoutName}" (selected: "${this.state.selectedWorkoutName}")`);
        console.log('Match:', exercise.workoutName === this.state.selectedWorkoutName);
      });
    }

    // Combine and sort all exercises by date
    let allExercises = [
      ...cardioExercises.map(exercise => ({ ...exercise, type: 'cardio' })),
      ...strengthExercises.map(exercise => ({ ...exercise, type: 'strength' }))
    ];

    // Sort by date
    allExercises.sort((a, b) => 
      this.state.sortDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );

    // Render exercises
    return allExercises.map(currentExercise => {
      if (currentExercise.type === 'cardio') {
        return <CardioExercise exercise={currentExercise} deleteExercise={this.deleteCardioExercise} editExercise={this.editExercise} key={currentExercise._id} />;
      } else {
        // Create strength exercise component inline
        return (
          <div key={currentExercise._id} style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '16px',
            padding: '1.5rem',
            color: 'white',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
          }}
          >
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '100px',
              height: '100px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(30px, -30px)'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                fontSize: '1.2rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {currentExercise.workoutName}
              </h4>
              
              <div style={{ 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Date:</span>
                <span style={{ fontWeight: '600' }}>{new Date(currentExercise.date).toLocaleDateString()}</span>
              </div>
              
              <div style={{ 
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem' }}>Sets:</div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '0.5rem'
                }}>
                  {currentExercise.sets.map((set, index) => (
                    <div key={index} style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Set {index + 1}</div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                        {set.weight}kg × {set.reps} reps
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                justifyContent: 'flex-end'
              }}>
                <button 
                  onClick={() => { 
                    console.log('Edit button clicked for strength exercise:', currentExercise._id);
                    this.editExercise(currentExercise._id, 'strength'); 
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '0.5rem 1rem',
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
                  Edit
                </button>
                <button 
                  onClick={() => { this.deleteStrengthExercise(currentExercise._id) }}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '0.5rem 1rem',
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  strengthExerciseList() {
    let exercises = this.state.strengthExercises
      .filter(exercise => !this.state.selectedWorkoutName || exercise.workoutName === this.state.selectedWorkoutName);

    exercises.sort((a, b) => this.state.sortDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    return exercises.map(currentExercise => (
      <div key={currentExercise._id} style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        borderRadius: '16px',
        padding: '1.5rem',
        color: 'white',
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
      }}
      >
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(30px, -30px)'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '1.2rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {currentExercise.workoutName}
          </h4>
          
          <div style={{ 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Date:</span>
            <span style={{ fontWeight: '600' }}>{new Date(currentExercise.date).toLocaleDateString()}</span>
          </div>
          
          <div style={{ 
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem' }}>Sets:</div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '0.5rem'
            }}>
        {currentExercise.sets.map((set, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Set {index + 1}</div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                    {set.weight}kg × {set.reps} reps
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            justifyContent: 'flex-end'
          }}>
            <button 
              onClick={() => { 
                console.log('Edit button clicked for strength exercise:', currentExercise._id);
                this.editExercise(currentExercise._id, 'strength'); 
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
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
              Edit
            </button>
            <button 
              onClick={() => { this.deleteStrengthExercise(currentExercise._id) }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
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
              Delete
            </button>
          </div>
        </div>
      </div>
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

  editExercise(id, type) {
    // Fetch the exercise data and navigate to edit page
    const url = type === 'cardio' ? 'cardioExercises' : 'strengthExercises';
    const fullUrl = `${config.API_URL}/${url}/${id}`;
    
    console.log('Fetching exercise data:', { id, type, url, fullUrl });
    
    // Test if the URL is accessible
    fetch(fullUrl)
      .then(response => {
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Exercise data fetched successfully with fetch:', data);
        this.props.onEdit({
          id: id,
          type: type,
          data: data
        });
      })
      .catch(error => {
        console.error('Error with fetch:', error);
        
        // Fallback to axios
        axios.get(fullUrl)
          .then(response => {
            console.log('Exercise data fetched successfully with axios:', response.data);
            const exerciseData = response.data;
            this.props.onEdit({
              id: id,
              type: type,
              data: exerciseData
            });
          })
          .catch(axiosError => {
            console.error('Error with axios:', axiosError);
            console.error('Error response:', axiosError.response?.data);
            console.error('Error status:', axiosError.response?.status);
            alert(`Error loading exercise data: ${axiosError.response?.data || axiosError.message}`);
          });
      });
  }

  render() {
    console.log('ExercisesList component rendering');
    const filteredWorkoutNames = this.state.filter === 'Cardio'
      ? this.state.cardioExercises.map(exercise => exercise.workoutName)
      : this.state.filter === 'Strength'
      ? this.state.strengthExercises.map(exercise => exercise.workoutName)
      : [...this.state.cardioExercises.map(exercise => exercise.workoutName), 
         ...this.state.strengthExercises.map(exercise => exercise.workoutName)];

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: '#2d3748', 
            marginBottom: '1.5rem', 
            fontSize: '1.8rem',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Exercise Dashboard
          </h2>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div style={{ minWidth: '200px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#4a5568'
              }}>
                Exercise Type
              </label>
          <select
            required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
            value={this.state.filter}
            onChange={this.onChangeFilter}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          >
            <option value="All">All</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
          </select>
        </div>

            <div style={{ minWidth: '200px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#4a5568'
              }}>
                Workout Name
              </label>
          <select
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
            value={this.state.selectedWorkoutName}
            onChange={this.onChangeWorkoutName}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          >
                <option value="">All Workouts</option>
            {filteredWorkoutNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
            </div>
          </div>
        </div>

        {this.state.filter === 'All' && (
          <div>
            <h3 style={{ 
              color: '#2d3748', 
              marginBottom: '1.5rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              All Exercises
              <button
                onClick={this.toggleSortDate}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginLeft: 'auto'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Sort by Date {this.state.sortDateAsc ? '↑' : '↓'}
              </button>
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
            }}>
              {this.allExercisesList()}
            </div>
          </div>
        )}

        {this.state.filter === 'Cardio' && (
          <div>
            <h3 style={{ 
              color: '#2d3748', 
              marginBottom: '1.5rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Cardio Exercises
              <button
                onClick={this.toggleSortDate}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginLeft: 'auto'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Sort by Date {this.state.sortDateAsc ? '↑' : '↓'}
              </button>
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
            }}>
                {this.cardioExerciseList()}
            </div>
          </div>
        )}

        {this.state.filter === 'Strength' && (
          <div>
            <h3 style={{ 
              color: '#2d3748', 
              marginBottom: '1.5rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Strength Exercises
              <button
                onClick={this.toggleSortDate}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginLeft: 'auto'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Sort by Date {this.state.sortDateAsc ? '↑' : '↓'}
              </button>
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
            }}>
                  {this.strengthExerciseList()}
            </div>
          </div>
        )}
      </div>
    );
  }
}
