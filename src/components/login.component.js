import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; // Import withRouter

class Login extends Component {
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
    this.continueAsGuest = this.continueAsGuest.bind(this);
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:5001/users/login', user)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ errorMessage: 'Invalid email or password' });
        console.log(error);
      });
  }

  continueAsGuest() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
              <div className="mb-4 text-red-500">
                {this.state.errorMessage}
              </div>
            )}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md"
              >
                Login
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={this.continueAsGuest}
              >
                Continue as Guest
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <a href="/signup" className="text-indigo-500">Don't have an account? Sign Up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login); // Wrap the component with withRouter
