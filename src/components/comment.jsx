import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import {
  Avatar,
  Link,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';

import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

const styles = {
  bubble: {
    padding: '8px',
    background: '#F4F6F8',
    borderRadius: '10px',
  },
};

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <Grid container direction="row" alignItems="center" style={{ marginBottom: '16px' }}>
        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            alt={`${comment.user.surname} ${comment.user.name}  ${comment.user.middlename}`}
            component={RouterLink}
            src={binaryArrayToBase64(comment.user.user_photo)}
            to={`/profiles/${comment.user}`}
          >
            {!comment.user.user_photo ? getInitials(comment.user) : ''}
          </Avatar>
        </Grid>
        <Grid item style={{ marginLeft: '8px', flexGrow: 1 }}>
          <Grid container direction="column" style={{ ...styles.bubble }}>
            <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to={`/profiles/${comment.user}`}
                variant="h6"
              >
                {`${comment.user.surname} ${comment.user.name}`}
              </Link>
              <Typography
                variant="body2"
              >
                {moment(comment.created_datetime).format('DD.MM.YYYY')}
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: '8px' }}>
              <Typography
                variant="body1"
              >
                {comment.content}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Comment;
