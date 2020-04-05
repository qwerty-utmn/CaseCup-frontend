import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import {
  Menu,
  Grid,
  Typography,
  Button,
  ListItemText,
  MenuItem,
  Container,
  TextField,
  IconButton,
} from '@material-ui/core';
import ProjectCard from '../components/projectCard';
import smartEnding from '../heplers/wordSmartEnding';
import { createReaction, getProjects } from '../actions/projects';
import { getUserByToken } from '../actions/user';

const sortOptions = [
  { name: 'Самые новые', value: 'project_id' },
  { name: 'По лайкам', value: 'likes' },
  { name: 'По дизлайкам', value: 'dislikes' },
];

class ProjectsBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortField: 'likes',
      sortDirection: 'ASC',
      sortMenuOpened: false,
      anchorEl: null,
      searchString: '',
      sortFieldName: 'Сортировка',
    };
  }

  handleSearchChange = (e) => {
    e.persist();
    this.setState(
      {
        searchString: e.target.value,
      },
      () => this.getProjects(),
    );
  };

  getProjects = () => {
    const { searchString, sortDirection, sortField } = this.state;
    this.props.getProjects(sortField, sortDirection, searchString);
  };

  handleSortSelect = (name, value) => {
    const { sortDirection, sortField } = this.state;
    let newDirection = 'desc';
    if (value === sortField) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else {
        newDirection = 'asc';
      }
    }
    this.setState({
      sortDirection: newDirection,
      sortField: value,
      sortFieldName: name,
      sortMenuOpened: false,
    }, () => this.getProjects());
  };

  componentDidMount = () => {
    if (!this.props.currentUser.user_id) {
      const token = localStorage.getItem('token');
      this.props.getUserByToken(token);
    }
    this.props.getProjects();
  };

  render() {
    const {
      createReaction, projects, currentUser, getProjects,
    } = this.props;
    const {
      sortField,
      sortFieldName,
      anchorEl,
      sortMenuOpened,
      searchString,
      sortDirection,
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
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                containerjustify="right"
              >
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
                    {sortFieldName}
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
                    {sortOptions.map(({ name, value }) => (
                      <MenuItem
                        key={name}
                        onClick={() => {
                          this.handleSortSelect(name, value);
                        }}
                      >
                        <ListItemText primary={name} />
                        {value === sortField
                          && (sortDirection === 'ASC' ? (
                            <ArrowUpwardIcon />
                          ) : (
                            <ArrowDownwardIcon />
                          ))}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <TextField
                        label="Поиск"
                        size="small"
                        value={searchString}
                        variant="outlined"
                        onChange={this.handleSearchChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
                    getProjects={getProjects}
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
    getProjects: (filter = 'start_datetime', sort = 'desc', search_string = '') => dispatch(getProjects(filter, sort, search_string)),
    getUserByToken: (token) => dispatch(getUserByToken(token)),
  }),
)(ProjectsBrowse);
