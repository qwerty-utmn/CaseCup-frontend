import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
} from '@material-ui/core';

class ProjectEdit extends Component {
  render() {
    return (
      <Container>PROJECT EDIT</Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
