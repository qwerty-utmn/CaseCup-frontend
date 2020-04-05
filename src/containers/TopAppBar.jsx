import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Toolbar,
  AppBar,
  Grid,
  Button,
  Hidden,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import { white } from 'material-ui/styles/colors';
import { clearUser } from '../actions/user';

class TopAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverIsOpen: false,
    };
  }

  signOut = () => {
    this.props.clearUser(this.props.history);
  }

  render() {
    const isLoggedIn = localStorage.getItem('token');
    const { driverIsOpen } = this.state;
    return (
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>
          <Grid container direction="row" alignItems="flex-end" justify="space-between" spacing={1}>
            <Grid item>
              <Grid container direction="row" alignItems="center" justify="flex-start" spacing={1}>
                <Grid item>
                  <Hidden smUp>
                    {isLoggedIn && (
                    <IconButton
                      color="inherit"
                      onClick={() => this.setState((prevState) => ({ driverIsOpen: !prevState.driverIsOpen }))}
                    >
                      <MenuIcon />
                    </IconButton>
                    )}
                  </Hidden>
                </Grid>
                <Hidden xsDown>
                  <Grid item>
                    <RouterLink to="/">
                      <Typography variant="h2" style={{ color: white }}>МФЦ.Предложения</Typography>
                    </RouterLink>
                  </Grid>
                </Hidden>
                {/* <Grid item>
                  <RouterLink to="/projects">
                    <Typography variant="h5" style={{ color: white }}>Проекты</Typography>
                  </RouterLink>
                </Grid> */}

              </Grid>
            </Grid>
            {isLoggedIn && (
            <Grid item>
              <Hidden xsDown>
                <Grid container direction="row" alignItems="center" justify="flex-end" spacing={1}>
                  <Grid item>
                    <RouterLink to="/projects">
                      <Button
                        style={{ color: white }}
                      >
                        <ListRoundedIcon style={{ marginRight: '5px' }} />
                        Проекты
                      </Button>
                    </RouterLink>
                  </Grid>
                  <Grid item>
                    <RouterLink to={`/profiles/${this.props.currentUser.user_id}`}>
                      <Button
                        style={{ color: white }}
                      >
                        <PersonOutlineRoundedIcon style={{ marginRight: '5px' }} />
                        Профиль
                      </Button>
                    </RouterLink>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ color: white }}
                      onClick={this.signOut}
                    >
                      <InputIcon
                        style={{ marginRight: '5px' }}
                      />
                      Выход
                    </Button>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
            )}
          </Grid>
        </Toolbar>
        <Drawer
          anchor="left"
          open={driverIsOpen}
          onClose={() => this.setState({ driverIsOpen: false })}
        >

          <Divider />
          <List
            onClick={() => this.setState({ driverIsOpen: false })}
            subheader={(
              <ListSubheader>
                МФЦ.Предложения
              </ListSubheader>
            )}
          >
            <ListItem button component={RouterLink} to="/">
              <ListItemIcon>
                <ListRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Список проектов" />
            </ListItem>
            <ListItem button component={RouterLink} to={`/profiles/${this.props.currentUser.user_id}`}>
              <ListItemIcon>
                <PersonOutlineRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Профиль" />
            </ListItem>
            {/* <ListItem button component={(props) => <RouterLink to={`/profiles/${this.props.currentUser.user_id}`} {...props} />}>
              <ListItemIcon><PersonOutlineRoundedIcon /></ListItemIcon>
              <ListItemText primary="Профиль" />
            </ListItem> */}
            <ListItem button onClick={this.signOut}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary="Выход" />
            </ListItem>
          </List>
        </Drawer>

      </AppBar>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    currentUser: state.currentUser,
  }),
  (dispatch) => ({
    clearUser: (history) => dispatch(clearUser(history)),
  }),
)(TopAppBar));
