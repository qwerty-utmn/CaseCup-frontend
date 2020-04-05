import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Toolbar,
  AppBar,
  Grid,
  Button,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { white } from 'material-ui/styles/colors';

class TopAppBar extends Component {
  render() {
    return (
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>

          <Grid container direction="row" alignItems="flex-end" justify="space-between" spacing={4}>
            <Grid item>
              <RouterLink to="/">
                <Typography variant="h2" style={{ color: white }}>Title</Typography>
              </RouterLink>
            </Grid>
            <Grid item>
              <Grid container direction="row" containerjustify="left" spacing={4}>
                <Grid item>
                  <RouterLink to="/projects">
                    <Typography variant="h3" style={{ color: white }}>Проекты</Typography>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to={`profile/${this.props.currentUser.id}`}>
                    <Typography variant="h2" style={{ color: white }}>Профиль</Typography>
                  </RouterLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
              >
                <InputIcon style={{ marginRight: '5px' }} />
                Sign out
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.currentUser,
});

export default connect(mapStateToProps)(TopAppBar);
