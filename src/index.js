import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { getUserByToken } from './actions/user';
import theme from './theme';

const ensureAuthenticated = (nextState, replace, callback) => {
  const { dispatch } = store;
  const { currentUser } = store.getState();
  const token = localStorage.getItem('token');
  if (!currentUser.id && token) {
    dispatch(getUserByToken(token));
  } else if (!localStorage.getItem('token')) {
    replace('/');
  }
  callback();
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <TopAppBar />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="projects" component={App} onEnter={ensureAuthenticated}>
            <Route path="create" component={ProjectCreation} />
            <Route path=":projectId" component={Project} />
            <Route path="edit/:projectId" component={ProjectEdit} />
          </Route>
          <Route exact path="/profiles/:profileId" component={Profile} onEnter={ensureAuthenticated} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
