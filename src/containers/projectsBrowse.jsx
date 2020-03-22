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
import { reactionChange } from '../actions/projects';


class ProjectCreation extends Component {
  constructor(props) {
    super(props);
    const data = {
      projects: [
        {
          id: '1',
          name: 'FIRST PROJECT',
          author: { id: '1', name: 'Ivan Baynov', image: 'NO' },
          date: '22.01.2019',
          reactionsCount: '1000',
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
          author: { id: '2', name: 'ALexey Baynov', image: 'YES' },
          date: '22.01.2019',
          reactionsCount: '1000',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          id: '3',
          name: 'THIRD PROJECT',
          author: { id: '3', name: 'Igor Baynov', image: 'ROCK' },
          date: '22.01.2019',
          reactionsCount: '1000',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          id: '4',
          name: 'FORTh PROJECT',
          author: { id: '4', name: 'Igor Baynov', image: 'ROCK' },
          date: '22.01.2019',
          reactionsCount: '1000',
          description:
            'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
          categories: [{ name: 'Компьютер', color: '#AAA' }],
        },
        {
          id: '5',
          name: 'FIFTH PROJECT',
          author: { id: '5', name: 'Igor Baynov', image: 'ROCK' },
          date: '22.01.2019',
          reactionsCount: '1000',
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


  render() {
    const { reactionChange } = this.props;
    const {
      projects, selectedSort, anchorEl, sortMenuOpened,
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
                {`Всего ${projects.length} ${smartEnding(
                  projects.length,
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
                <Grid item key={project.id} xs={12} sd={6} md={4}>
                  <ProjectCard project={project} reactionChange={reactionChange} />
                </Grid>
              ))}
          </Grid>
          <Grid item>{/* <Pagination count={10} size="large" /> */}</Grid>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = () => ({
  // project: store.project
});
const mapDispatchToProps = (dispatch) => ({
  reactionChange: (id, reaction) => dispatch(reactionChange(id, reaction)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreation);
