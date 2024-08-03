import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:5001/users/signup', newUser)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/login');
      })
      .catch(error => {
        this.setState({ errorMessage: 'Error signing up' });
        console.log(error);
      });
  }

  render() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={this.onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            {this.state.errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {this.state.errorMessage}
              </div>
            )}
            <div className="mb-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md w-full"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <p>Already have an account? <Link to="/login" className="text-indigo-500">Go Back to Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
