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
// const PrivateRoute = ({ component, ...rest }) => {
//   console.log(component);
//   console.log(rest);
//   return (
//     <Route
//       render={() => (checkAuth() ? (
//         React.createElement(component, { ...rest })
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/signin',
//             state: { from: rest.location },
//           }}
//         />
//       ))}
//     />
//   );
// };
export default PrivateRoute;
