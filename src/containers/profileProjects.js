import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
} from '@material-ui/core';
import ProfileProjectCard from '../components/profileProjectCard';

class ProfileProjects extends Component {
  render() {
    const { projects } = this.props;
    return (
      <Grid container direction="column" spacing={3}>
        {projects && (projects.map((project) => (
          <Grid item key={project.id}>
            <ProfileProjectCard project={project} />
          </Grid>
        )))}
      </Grid>
    );
  }
}
const mapStateToProps = () => ({
  // project: store.project
});
const mapDispatchToProps = () => ({
  // login: (username, password) => dispatch(login(username, password)),
  // signup: (username, password) => dispatch(signup(username, password)),
  // logout: () => dispatch(logout()),
  // removeErrors: () => dispatch(removeErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileProjects);
