import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Tracktastic</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Log History</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/name" className="nav-link">Add Workout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}