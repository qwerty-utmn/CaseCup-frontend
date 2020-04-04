import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import {
  Typography, Toolbar, AppBar, Grid,
} from '@material-ui/core';
import { white } from 'material-ui/styles/colors';

class TopAppBar extends Component {
  render() {
    return (
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>
          <Grid container direction="row" alignItems="flex-end" containerjustify="left" spacing={4}>
            <Grid item>
              <RouterLink to="/">
                <Typography variant="h2" style={{ color: white }}>Title</Typography>
              </RouterLink>
            </Grid>
            {/* <Grid item>
              <RouterLink to="/projects">
                <Typography variant="h3" style={{ color: white }}>Проекты</Typography>
              </RouterLink>
            </Grid> */}
            <Grid item>
              {/* <RouterLink to={`profile/${this.props.currentUser.id}`}>
                <Typography variant="h2" style={{ color: white }}>Профиль</Typography>
              </RouterLink> */}
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
