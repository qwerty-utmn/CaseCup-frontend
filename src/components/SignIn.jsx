import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Card, Typography, Button, Input,
} from '@material-ui/core';
import { submitLoginInformation } from '../actions/user';

const SignIn = ({
  submitLoginInformation,
}) => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  return (
    <Container maxWidth="xs">
      <Card>
        <Typography>
          Sign in
        </Typography>
        <form onSubmit={submitLoginInformation}>
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Sign in
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default connect(
  (state) => ({

  }),
  {
    submitLoginInformation,
  },
)(SignIn);
