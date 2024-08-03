import React from 'react';
import { withRouter } from 'react-router-dom';
import App from './App';

// Enhance App with routing context
const AppWrapper = ({ location }) => {
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return <App isAuthPage={isAuthPage} />;
};

export default withRouter(AppWrapper);
