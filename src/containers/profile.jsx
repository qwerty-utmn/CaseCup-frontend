import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Divider,
  Tab,
  Tabs,
  TextField,
  Avatar,
  Card,
  CardContent,
  Button,
} from '@material-ui/core';
import ProfileProjects from './profileProjects';
import getTabProps from '../heplers/getTabProps';
import TabPanel from '../components/tabPanel';
import {
  getUserInformation,
  updateUser,
  getUserProjects,
  getUserMarkedProjects,
  getUserByToken,
} from '../actions/user';
import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      userForm: {
        user_id: '',
        name: '',
        username: '',
        surname: '',
        middlename: '',
        user_photo: '',
      },
      errors: {
        user_id: false,
        name: false,
        username: false,
        surname: false,
        middlename: false,
        user_photo: false,
      },
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    this.props.getUserByToken(token);
    this.props.getUserInformation(this.props.match.params.profileId);
    if (this.props.user.user_id && this.state.userForm.user_id !== this.props.user.user_id) {
      this.setState({ userForm: { ...this.props.user } });
    }
  }

  componentDidUpdate = () => {
    if (this.props.user.user_id && this.state.userForm.user_id !== this.props.user.user_id) {
      const { user_reactions, role, ...rest } = this.props.user;
      this.setState({ userForm: { ...rest } });
    }
  }

  handlePhotoAdd = (e) => {
    e.persist();
    const reader = new FileReader();
    reader.onload = () => {
      const parts = reader.result.split(';base64,');
      const contentType = parts[0].replace('data:', '');
      const base64 = parts[1];
      const byteArray = base64;
      // const byteArray = Uint8Array.from(window.atob(base64), (c) => c.charCodeAt(0));
      // console.log(window.btoa(byteArray));

      this.setState((prevState) => ({
        userForm: {
          ...prevState.userForm,
          user_photo: byteArray,
        },
      }));
    };

    reader.readAsDataURL(e.target.files[0]);
  };


  handlePhotoRemove = () => {
    this.setState((prevState) => ({
      userForm: {
        ...prevState.userForm,
        user_photo: '',
      },
    }));
  };

  handleSaveButtonClick = () => {
    this.props.updateUser(this.state.userForm);
  };

  handleUserFormChange=(e) => {
    e.persist();
    const error = e.target.value.length === 0;
    this.setState((prevState) => ({
      userForm: {
        ...prevState.userForm,
        [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      },
      errors: {
        ...prevState.errors,
        [e.target.name]: error,
      },
    }));
  }

  render() {
    const {
      user,
      currentUser,
      getUserMarkedProjects,
      getUserProjects,
    } = this.props;

    const {
      currentTab,
      userForm,
      errors,
    } = this.state;
    const isFormValid = Object.values(errors).every((error) => error === false);

    return (
      <Container>
        {user && (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item sm style={{ paddingBottom: 0 }}>
                <Typography variant="overline" gutterBottom>
                  {user.role}
                </Typography>
                <Typography variant="h3">{`${user.surname} ${user.name}`}</Typography>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Tabs
                    value={currentTab}
                    onChange={(e, newValue) => {
                      this.setState({ currentTab: newValue });
                    }}
                  >
                    <Tab label="Основная информация" {...getTabProps(0)} />
                    <Tab
                      label={currentUser && user.user_id === currentUser.user_id ? 'Мои проекты' : 'Проекты пользователя'}
                      {...getTabProps(1)}
                    />
                    {/* {currentUser && user.user_id === currentUser.user_id && (
                      <Tab label="Оцененные проекты" {...getTabProps(2)} />
                    )} */}
                  </Tabs>
                  <Divider />
                </Grid>
              </Grid>
            </Grid>
            <TabPanel value={currentTab} index={0}>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={3}>
                <Grid item>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <Card>
                        <CardContent style={{ padding: '16px 0px 0px 0px' }}>
                          <Grid container justify="center" alignItems="center" direction="column">
                            <Grid item>
                              {/* <Tooltip
                          title={(
                            <Button>
                              Изменить фотографию
                            </Button>
                            )}
                          interactive
                        > */}
                              <Avatar
                                variant="square"
                                style={{ height: '200px', width: '200px' }}
                                src={binaryArrayToBase64(userForm.user_photo)}
                                alt={`${userForm.surname} ${userForm.name}  ${userForm.middlename}`}
                              >
                                {!userForm.user_photo ? getInitials(user) : ''}
                              </Avatar>
                            </Grid>
                            {currentUser && user.user_id === currentUser.user_id && (
                            <Grid item xs>
                              <Grid container spacing={1} direction="row">
                                <Grid item xs>
                                  <Button
                                    variant="contained"
                                    component="label"
                                  >
                                    Изменить
                                    <input
                                      accept="image/*"
                                      type="file"
                                      style={{ display: 'none' }}
                                      onChange={this.handlePhotoAdd}
                                    />
                                  </Button>
                                </Grid>
                                <Grid item xs>
                                  <Button
                                    variant="contained"
                                    component="label"
                                    onClick={this.handlePhotoRemove}
                                  >
                                    Удалить
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <Card>
                        <CardContent>
                          <Grid item container direction="column" spacing={2}>
                            <Grid item>
                              <TextField
                                label="Фамилия"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={userForm.surname}
                                disabled={currentUser && user.user_id !== currentUser.user_id}
                                name="surname"
                                onChange={this.handleUserFormChange}
                                error={errors.surname}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                label="Имя"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={userForm.name}
                                disabled={currentUser && user.user_id !== currentUser.user_id}
                                name="name"
                                onChange={this.handleUserFormChange}
                                error={errors.name}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                label="Отчество"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={userForm.middlename}
                                disabled={currentUser && user.user_id !== currentUser.user_id}
                                name="middlename"
                                onChange={this.handleUserFormChange}
                                error={errors.middlename}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                label="E-mail"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={userForm.username}
                                disabled={currentUser && user.user_id !== currentUser.user_id}
                                name="username"
                                onChange={this.handleUserFormChange}
                                error={errors.username}
                                fullWidth
                                required
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {currentUser && user.user_id === currentUser.user_id
                    && (
                    <Grid item>
                      <Grid container justify="center">
                        <Grid item>

                          <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleSaveButtonClick}
                            disabled={!isFormValid}
                          >
                            Сохранить
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={currentTab} tag="tabpanel-clientform" index={1}>
              <ProfileProjects getProjects={getUserProjects} user={user} />
            </TabPanel>
            {/* {currentUser && user.user_id === currentUser.user_id && (
              <TabPanel value={currentTab} tag="tabpanel-clientform" index={1}>
                <ProfileProjects getProjects={getUserMarkedProjects} user={currentUser} />
              </TabPanel>
            )} */}
          </>
        )}
      </Container>
    );
  }
}
export default withRouter(connect(
  (store) => ({
    user: store.user,
    currentUser: store.currentUser,
  }),
  (dispatch) => ({
    getUserInformation: (id) => dispatch(getUserInformation(id)),
    getUserMarkedProjects: (id) => dispatch(getUserMarkedProjects(id)),
    getUserProjects: (id) => dispatch(getUserProjects(id)),
    updateUser: (id, user) => dispatch(updateUser(id, user)),
    getUserByToken: (token) => dispatch(getUserByToken(token)),
  }),
)(Profile));
