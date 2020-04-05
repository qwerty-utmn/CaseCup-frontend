import React from 'react';
import {
  Redirect, Route,
} from 'react-router-dom';

const SignInRoute = ({ children, ...rest }) => {
  const hasToken = Boolean(localStorage.getItem('token'));
  return (
    <Route
      {...rest}
      render={({ location }) => (!hasToken ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/projects',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default SignInRoute;
