import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
} from '@material-ui/core';
import ProfileProjectCard from '../components/profileProjectCard';

class ProfileProjects extends Component {
  componentDidMount=() => {
    this.props.getProjects(this.props.user.user_id);
  }

  render() {
    const { userProjects } = this.props;
    return (
      <Grid container direction="column" spacing={3}>
        {userProjects && (userProjects.map((project) => (
          <Grid item key={project.project_id}>
            <ProfileProjectCard project={project} />
          </Grid>
        )))}
      </Grid>
    );
  }
}
const mapStateToProps = (store) => ({
  userProjects: store.currentUser.userProjects,
});
export default connect(mapStateToProps)(ProfileProjects);
