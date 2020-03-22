import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  TableCell,
  TableRow,
  CardContent,
  Button,
  CardHeader,
  Table,
  TableBody,
} from '@material-ui/core';
import ProfileProjects from './profileProjects';
import getTabProps from '../heplers/getTabProps';
import TabPanel from '../components/tabPanel';
import {
  getUserInformation,
  updateUser,
  updateUserPhoto,
  getUserProjects,
  getUserMarkedProjects,
} from '../actions/user';
import getInitials from '../heplers/getInitials';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      userForm: {
        id: '',
        name: '',
        username: '',
        surname: '',
        middlename: '',
        user_photo: '',
      },
    };
  }

  handlePhotoAdd=(e) => {
    this.props.updateUserPhoto(this.props.match.params.profileId, this.state.user.user_photo);
  };

  handleSaveButtonClick=() => {
    this.props.updateUserPhoto(this.props.match.params.profileId, this.state.user);
  };

  componentDidMount() {
    console.log(this.props);
    this.props.getUserInformation(this.props.match.params.profileId);
    if (this.state.userForm.id !== this.props.user.id) this.setState({ userForm: { ...this.props.user } });
  }

  render() {
    const {
      user,
      currentUser,
      getUserMarkedProjects,
      getUserProjects,
    } = this.props;

    const { currentTab, userForm } = this.state;

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
                    <Tab label={currentUser && user.id === currentUser.id ? 'Мои проекты' : 'Проекты пользователя'} {...getTabProps(1)} />
                    {currentUser && user.id === currentUser.id && (
                    <Tab label="Оцененные проекты" {...getTabProps(2)} />)}
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
                              <Avatar variant="square" style={{ height: '200px', width: '200px' }} src={user.user_photo} alt={`${user.surname} ${user.name}  ${user.middlename}`}>
                                {!user.user_photo ? getInitials(user) : ''}
                              </Avatar>
                            </Grid>
                            {currentUser && user.id === currentUser.id && (
                              <Grid item xs>
                                <Grid container spacing={1} direction="row">
                                  <Grid item xs>
                                    <Button
                                      variant="contained"
                                      component="label"
                                    >
                                      Изменить
                                      <input
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
                                    >
                                      Удалить
                                      <input
                                        accept="image/*"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={this.handlePhotoRemove}
                                      />
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item>
                      <Card>
                        <CardHeader title="Статистика" style={{ paddingBottom: 0 }} />
                        <Divider />
                        <CardContent style={{ paddingTop: 0 }}>
                          <Table>
                            <TableBody>
                              {user.stats
                          && user.stats.map((stat) => (
                            <TableRow key={stat.name}>
                              <TableCell>
                                {stat.name}
                              </TableCell>
                              <TableCell>
                                {stat.count}
                              </TableCell>
                            </TableRow>
                          ))}
                            </TableBody>
                          </Table>
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
                                disabled={currentUser && user.id === currentUser.id}
                                onChange={(e, newValue) => {
                                  this.setState({ userForm: { ...userForm, surname: newValue } });
                                }}
                                fullWidth
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
                                value={user.name}
                                disabled={currentUser && user.id === currentUser.id}
                                onChange={(e, newValue) => {
                                  this.setState({ userForm: { ...userForm, name: newValue } });
                                }}
                                fullWidth
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
                                disabled={currentUser && user.id === currentUser.id}
                                onChange={(e, newValue) => {
                                  this.setState({ userForm: { ...userForm, middlename: newValue } });
                                }}
                                fullWidth
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
                                disabled={currentUser && user.id === currentUser.id}
                                onChange={(e, newValue) => {
                                  this.setState({ userForm: { ...userForm, username: newValue } });
                                }}
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item>
                      <Grid container justify="center">
                        <Grid item>
                          <Button color="primary" variant="contained" onClick={this.handleSaveButtonClick}>
                            Сохранить
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={currentTab} tag="tabpanel-clientform" index={1}>
              <ProfileProjects getProjects={getUserProjects} user={user} />
            </TabPanel>
            {currentUser && user.id === currentUser.id && (
            <TabPanel value={currentTab} tag="tabpanel-clientform" index={1}>
              <ProfileProjects getProjects={getUserMarkedProjects} user={currentUser} />
            </TabPanel>
            )}
          </>
        )}
      </Container>
    );
  }
}
const mapStateToProps = (store) => ({
  user: store.user,
  currentUser: store.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getUserInformation: (id) => dispatch(getUserInformation(id)),
  getUserMarkedProjects: (id) => dispatch(getUserMarkedProjects(id)),
  getUserProjects: (id) => dispatch(getUserProjects(id)),
  updateUser: (id, user) => dispatch(updateUser(id, user)),
  updateUserPhoto: (id, photo) => dispatch(updateUserPhoto(id, photo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
