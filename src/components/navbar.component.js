import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the custom CSS file

export default class Navbar extends Component {
  // All components have to render something
  render() {
    return (
      <nav className="navbar navbar-expand-lg custom-navbar">
        <Link to="/" className="navbar-brand">Track Your Exercise!</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Log History</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Entry</Link>
            </li>
            <li className="navbar-item">
              <Link to="/name" className="nav-link">Add Workout Name</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}