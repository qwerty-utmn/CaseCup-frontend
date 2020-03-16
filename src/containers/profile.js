import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Divider,
  Tab,
  Tabs,
  Box,
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

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box paddingTop={2}>
        {' '}
        {children}
      </Box>
      )}
    </Box>
  );
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      user: { ...props.currentUser },
      bookmarkedProjects: { ...props.bookmarkedProjects },
    };
  }

  a11yProps=(index) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
    value: index,
  })

  render() {
    // const { user,bookmarkedProjects,stats } = this.state;
    const { user, bookmarkedProjects } = {
      user: {
        role: { id: 0, name: 'user' },
        name: 'Ivan',
        surname: 'Baynov',
        middlename: 'Sergeevich',
        email: 'Jhon0@yandex.ru',
        stats: [{ name: 'Количество оставленных комментариев', count: 10 },
          { name: 'Количество созданных предложений', count: 20 },
          { name: 'Количество оцененных предложений', count: 0 }],
      },
      bookmarkedProjects: [
        {
          id: '1',
          name: 'FIRST PROJECT',
          author: {
            id: '1',
            name: 'Ivan',
            surname: 'Baynov',
            middlename: 'Sergeevich',
            image: '',
          },
          price: '1000',
          members: [],
          startDate: '22.01.2019',
          endDate: '22.01.2019',
          currentState: 'Обсуждение',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [
            { name: 'Компьютер', color: '#AAA' },
            { name: 'Телефон', color: '#AAA' },
          ],
        },
        {
          id: '2',
          name: 'SECOND PROJECT',
          author: {
            id: '2',
            name: 'ALexey',
            surname: 'Baynov',
            middlename: 'Sergeevich',
            image: '',
          },
          price: '1000',
          members: [],
          startDate: '22.01.2019',
          endDate: '22.01.2019',
          currentState: 'Обсуждение',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          id: '3',
          name: 'THIRD PROJECT',
          author: {
            id: '3',
            name: 'Igor',
            surname: 'Baynov',
            middlename: 'Sergeevich',
            image: '',
          },
          price: '1000',
          members: [],
          startDate: '22.01.2019',
          endDate: '22.01.2019',
          currentState: 'Обсуждение',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          id: '4',
          name: 'FORTh PROJECT',
          author: {
            id: '4',
            name: 'Igor',
            surname: 'Egorov',
            middlename: 'Sergeevich',
            image: '',
          },
          price: '1000',
          members: [],
          startDate: '22.01.2019',
          endDate: '22.01.2019',
          currentState: 'Обсуждение',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          id: '5',
          name: 'FIFTH PROJECT',
          author: {
            id: '5',
            name: 'Igor',
            surname: 'Baynov',
            middlename: 'Sergeevich',
            image: '',
          },
          price: '1000',
          members: [],
          startDate: '22.01.2019',
          endDate: '22.01.2019',
          currentState: 'Обсуждение',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
      ],
    };
    const { currentTab } = this.state;

    return (
      <Container>
        <Grid container direction="column" spacing={3}>
          <Grid item sm style={{ paddingBottom: 0 }}>
            <Typography variant="overline" gutterBottom>
              {user.role && user.role.name}
            </Typography>
            <Typography variant="h3">{user.name}</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => {
                  this.setState({ currentTab: newValue });
                }}
              >
                <Tab label="Основная информация" {...this.a11yProps(0)} />
                <Tab label="Проекты" {...this.a11yProps(1)} />
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
                          <Avatar variant="square" style={{ height: '200px', width: '200px' }} src="" alt={`${user.surname} ${user.name}  ${user.middlename}`}>
                            {!user.image ? (`${user.surname[0]}${user.name[0]}${user.middlename[0]}`) : ''}
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
      </Container>
    );
  }
}
const mapStateToProps = () => ({
  // user: store.user,
});
const mapDispatchToProps = () => ({
  // login: (username, password) => dispatch(login(username, password)),
  // signup: (username, password) => dispatch(signup(username, password)),
  // logout: () => dispatch(logout()),
  // removeErrors: () => dispatch(removeErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
