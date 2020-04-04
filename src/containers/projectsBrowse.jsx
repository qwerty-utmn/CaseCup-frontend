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
import smartEnding from '../heplers/wordSmartEnding';
import { createReaction, getProjects, getProject } from '../actions/projects';
import { getUserByToken } from '../actions/user';

class ProjectsBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSort: 'Популярные',
      sortMenuOpened: false,
      anchorEl: null,
      // projects: [],
    };
  }

  componentDidMount=() => {
    if (!this.props.currentUser.user_id) {
      const token = localStorage.getItem('token');
      this.props.getUserByToken(token);
    }
    this.props.getProjects();
  };

  render() {
    const {
      createReaction,
      projects,
      currentUser,
    } = this.props;
    const {
      selectedSort,
      anchorEl,
      sortMenuOpened,
    } = this.state;
    return (
      <Container>
        <Grid container direction="column" spacing={3}>
          <Grid container item alignItems="flex-end" justify="space-between">
            <Grid item>
              <Typography variant="overline" gutterBottom component="h2">
                Просмотр проектов
              </Typography>
              <Typography variant="h3" component="h1">
                Ознакомьтесь с последними проектами
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
                {`Всего ${projects ? projects.length : '0'} ${smartEnding(
                  projects ? projects.length : '0',
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
                {selectedSort}
                <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => {
                  this.setState({ sortMenuOpened: false });
                }}
                open={sortMenuOpened}
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
            {projects
              && projects.map((project) => (
                <Grid item key={project.project_id} xs={12} sd={6} md={4}>
                  <ProjectCard
                    currentUser={currentUser}
                    project={project}
                    createReaction={createReaction}
                    getProject={getProject}
                  />
                </Grid>
              ))}
          </Grid>
          <Grid item>{/* <Pagination count={10} size="large" /> */}</Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    projects: state.projects,
    currentUser: state.currentUser,
  }),
  (dispatch) => ({
    createReaction: (id, reaction) => dispatch(createReaction(id, reaction)),
    getProjects: (filter = {}, sort = {}, search_string = '') => dispatch(getProjects(filter, sort, search_string)),
    getUserByToken: (token) => dispatch(getUserByToken(token)),
    getProject: (id) => dispatch(getProject(id)),
  }),
)(ProjectsBrowse);
