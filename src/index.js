import React from 'react';
import ReactDOM from 'react-dom';
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import TopAppBar from "./components/TopAppBar"
import ProjectCreation from "./containers/projectCreation"

import {
    theme
} from './theme';
import {
    ThemeProvider
} from '@material-ui/styles';

ReactDOM.render(

    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <TopAppBar />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/projects" component={App} />
                    <Route exact path="/projects/create" component={ProjectCreation} />
                </Switch>
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

