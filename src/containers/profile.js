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
import { getUserInformation } from '../actions/user';
import getInitials from '../heplers/getInitials';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      // user: { ...props.currentUser },
      // bookmarkedProjects: { ...props.bookmarkedProjects },
    };
  }


  render() {
    const { user, bookmarkedProjects } = this.props;

    const { currentTab } = this.state;

    return (
      <Container>
        {user && (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item sm style={{ paddingBottom: 0 }}>
                <Typography variant="overline" gutterBottom>
                  {user.role && user.role.name}
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
                    <Tab label="Проекты" {...getTabProps(1)} />
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
                            <Grid item xs>
                              <Grid container spacing={1} direction="row">
                                <Grid item xs>
                                  <Button>
                                    Изменить
                                  </Button>
                                </Grid>
                                <Grid item xs>
                                  <Button>
                                    Удалить
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
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
                                value={user.surname}
                                onChange={(newValue) => {
                                  this.setState({ user: { ...user, surname: newValue } });
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
                                onChange={(newValue) => {
                                  this.setState({ user: { ...user, name: newValue } });
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
                                value={user.middlename}
                                onChange={(newValue) => {
                                  this.setState({ user: { ...user, middlename: newValue } });
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
                                value={user.email}
                                onChange={(newValue) => {
                                  this.setState({ user: { ...user, email: newValue } });
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
                          <Button color="primary" variant="contained">
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
              <ProfileProjects projects={bookmarkedProjects} />
            </TabPanel>
          </>
        )}
      </Container>
    );
  }
}
const mapStateToProps = (store) => ({
  user: store.user,
});
const mapDispatchToProps = (dispatch) => ({
  getUserInformation: (id) => dispatch(getUserInformation(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
