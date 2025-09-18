// Configuration for different environments
const config = {
  development: {
    API_URL: 'http://localhost:5001'
  },
  production: {
    API_URL: process.env.REACT_APP_API_URL || 'https://mern-exercise-tracker-backend.railway.app'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate config
export default config[environment];
