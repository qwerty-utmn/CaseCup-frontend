import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ThemeProvider,
} from '@material-ui/styles';
import store from './store';
import './index.css';
import App from './App';
import TopAppBar from './components/TopAppBar';
import ProjectCreation from './containers/projectCreation';
import SignIn from './components/SignIn';
import ProjectEdit from './containers/projectEdit';
import Project from './containers/project';
import Profile from './containers/profile';
import theme from './theme';
import PrivateRoute from './components/PrivateRoute';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <TopAppBar />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute exact path="/">
            {/* <Route exact path="/projects" component={App} /> */}
            <App />
          </PrivateRoute>
          {/* <Route exact path="/" component={App} /> */}
          <PrivateRoute exact path="/projects">
            {/* <Route exact path="/projects" component={App} /> */}
            <App />
          </PrivateRoute>
          <PrivateRoute exact path="/projects/create">
            {/* <Route exact path="/projects" component={App} /> */}
            <ProjectCreation />
          </PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId">
            {/* <Route exact path="/projects" component={App} /> */}
            <Project />
          </PrivateRoute>
          <PrivateRoute exact path="/projects/edit/:projectId">
            {/* <Route exact path="/projects" component={App} /> */}
            <ProjectEdit />
          </PrivateRoute>
          <PrivateRoute exact path="/profiles/:profileId">
            {/* <Route exact path="/projects" component={App} /> */}
            <Profile />
          </PrivateRoute>

          {/* <Route exact path="/projects/create" component={ProjectCreation} />
          <Route exact path="/projects/:projectId" component={Project} />
          <Route exact path="/projects/edit/:projectId" component={ProjectEdit} />
          <Route exact path="/profiles/:profileId" component={Profile} /> */}
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
