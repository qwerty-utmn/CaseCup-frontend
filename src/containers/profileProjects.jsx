import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
} from '@material-ui/core';
import ProfileProjectCard from '../components/profileProjectCard';

class ProfileProjects extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getProjects(this.props.user.id);
  }

  render() {
    // const { userProjects } = this.props;
    const userProjects = [{
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
    }];
    return (
      <Grid container direction="column" spacing={3}>
        {userProjects && (userProjects.map((project) => (
          <Grid item key={project.id}>
            <ProfileProjectCard project={project} />
          </Grid>
        )))}
      </Grid>
    );
  }
}
const mapStateToProps = (store) => ({
  userProjects: store.userProjects,
});
export default connect(mapStateToProps)(ProfileProjects);
