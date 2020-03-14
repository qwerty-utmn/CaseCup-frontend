import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  Menu,
  Grid,
  Typography,
  Button,
  ListItemText,
  MenuItem,
  Container,
} from '@material-ui/core';
import ProjectCard from '../components/projectCard';

class ProjectCreation extends Component {
  constructor(props) {
    super(props);
    const data = {
      projects: [
        {
          name: 'FIRST PROJECT',
          author: { name: 'Ivan Baynov', image: 'NO' },
          date: '22.01.2019',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [
            { name: 'Компьютер', color: '#AAA' },
            { name: 'Телефон', color: '#AAA' },
          ],
        },
        {
          name: 'SECOND PROJECT',
          author: { name: 'ALexey Baynov', image: 'YES' },
          date: '22.01.2019',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          name: 'THIRD PROJECT',
          author: { name: 'Igor Baynov', image: 'ROCK' },
          date: '22.01.2019',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          name: 'FORTh PROJECT',
          author: { name: 'Igor Baynov', image: 'ROCK' },
          date: '22.01.2019',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          name: 'FIFTH PROJECT',
          author: { name: 'Igor Baynov', image: 'ROCK' },
          date: '22.01.2019',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
      ],
    };
    this.state = {
      selectedSort: 'Популярные',
      sortMenuOpened: false,
      anchorEl: null,
      ...data,
    };
  }

  smartEnding(number, forms, base = '') {
    const rest = number % 10;
    number %= 100;
    if (rest === 1 && number !== 11) return `${base}${forms[0]}`;
    if ([2, 3, 4].indexOf(rest) !== -1 && [12, 13, 14].indexOf(number) === -1) return `${base}${forms[1]}`;
    return `${base}${forms[2]}`;
  }

  render() {
    return (
      <Container>
        <Grid container direction="column" spacing={3}>
          <Grid container item alignItems="flex-end" justify="space-between">
            <Grid item>
              <Typography variant="overline" gutterBottom component="h2">
                Просмотр проектов
              </Typography>
              <Typography variant="h3" component="h1">
                Ознакомтесь с последними проектами
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                component={RouterLink}
                to="/projects/create"
                variant="contained"
              >
                <AddIcon style={{ marginRight: 3 }} />
                Создать свой проект
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="flex-end" justify="space-between">
            <Grid item>
              <Typography variant="h5">
                {`Всего ${this.state.projects.length} 
                                    ${this.smartEnding(
                  this.state.projects.length,
                  ['', 'a', 'ов'],
                  'проект',
                )}`}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                style={{
                  textTransform: 'none',
                  letterSpacing: 0,
                  marginRight: 3,
                }}
                onClick={(e) => {
                  this.setState({ anchorEl: e.currentTarget });
                  this.setState({ sortMenuOpened: true });
                }}
                htmlFor="sorting-menu"
              >
                {this.state.selectedSort}
                <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={this.state.anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => {
                  this.setState({ sortMenuOpened: false });
                }}
                open={this.state.sortMenuOpened}
                elevation={1}
              >
                {['Самые новые', 'Популярные'].map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      this.setState({ selectedSort: option });
                      this.setState({ sortMenuOpened: false });
                    }}
                  >
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            {this.state.projects
              && this.state.projects.map((project) => (
                <Grid item xs={12} sd={6} md={4}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
          </Grid>
          <Grid item>{/* <Pagination count={10} size="large" /> */}</Grid>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = (store) => ({
  // project: store.project
});
const mapDispatchToProps = (dispatch) => ({
  // login: (username, password) => dispatch(login(username, password)),
  // signup: (username, password) => dispatch(signup(username, password)),
  // logout: () => dispatch(logout()),
  // removeErrors: () => dispatch(removeErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreation);
