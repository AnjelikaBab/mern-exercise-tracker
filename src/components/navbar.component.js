import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-backgroundCol" >
       <Link to="/" className="navbar-brand text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300">
  Tracktastic
</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="customLink text-white hover:no-underline">Log History</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="customLink text-white hover:no-underline">Create Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/name" className="customLink text-white hover:no-underline">Add Workout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}