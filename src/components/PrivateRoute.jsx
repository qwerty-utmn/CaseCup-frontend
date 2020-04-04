import React from 'react';
import {
  Redirect, Route,
} from 'react-router-dom';
import checkAuth from '../heplers/checkAuth';

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => (checkAuth() ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: location },
        }}
      />
    ))}
  />
);

export default PrivateRoute;
