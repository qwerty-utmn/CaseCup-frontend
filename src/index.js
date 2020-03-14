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

import {
  theme,
} from './theme';

ReactDOM.render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <TopAppBar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/projects" component={App} />
          <Route exact path="/projects/create" component={ProjectCreation} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
