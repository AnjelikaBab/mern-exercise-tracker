import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateWorkoutName from "./components/create-workoutName.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home'
    };
  }

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  }

  renderPage = () => {
    switch(this.state.currentPage) {
      case 'home':
        return <ExercisesList onNavigate={this.setCurrentPage} onEdit={this.setEditData} />;
      case 'create':
        return <CreateExercise onNavigate={this.setCurrentPage} />;
      case 'name':
        return <CreateWorkoutName onNavigate={this.setCurrentPage} />;
      case 'edit':
        return <EditExercise onNavigate={this.setCurrentPage} editData={this.state.editData} />;
      default:
        return <ExercisesList onNavigate={this.setCurrentPage} onEdit={this.setEditData} />;
    }
  }

  setEditData = (editData) => {
    this.setState({ 
      currentPage: 'edit',
      editData: editData 
    });
  }

  render() {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}>
        <Navbar onNavigate={this.setCurrentPage} />
        <div className="container" style={{ padding: '2rem 0' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {this.renderPage()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;