import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Card,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { submitLoginInformation } from '../actions/user';

const SignIn = ({
  submitLoginInformation,
  user,
  history,
}) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const { username, password } = credentials;
    const possibleErrors = {};
    if (username && !username.match(/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/i)) {
      possibleErrors.email = 'Некорректый email';
    }
    if (password && password.length < 6) {
      possibleErrors.password = 'Пароль должен содержать как минимум 6 символов';
    }
    setErrors(possibleErrors);
  }, [credentials]);

  const handleInputChange = (e) => {
    e.persist();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if (Object.keys(errors).length === 0) {
    submitLoginInformation(credentials, history);
    // }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card>
        <Typography
          component="h1"
          style={{
            fontWeight: 300,
            fontSize: 30,
            color: '#343b4c',
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          Вход
        </Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleFormSubmit}
        >
          <TextField
            className="signin__input"
            variant="outlined"
            margin="normal"
            placeholder="Введите email"
            value={credentials.username}
            onChange={handleInputChange}
            required
            label="Логин"
            name="username"
            autoComplete="email"
            error={Boolean(errors.username)}
            helperText={errors.email || ''}
            autoFocus
            InputProps={{
              style: {
                fontSize: 14,
              },
            }}
          />
          <TextField
            className="signin__input"
            variant="outlined"
            margin="normal"
            placeholder="Введите пароль"
            value={credentials.password}
            onChange={handleInputChange}
            required
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password || ''}
            InputProps={{
              style: {
                fontSize: 14,
              },
            }}
          />
          {
            user.errors && (
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="error"
              style={{ margin: '10px auto' }}
            >
              Данные о пользователе указаны неверно
            </MuiAlert>
            )
          }
          <Button
            type="submit"
            fullWidth
            size="large"
            className="signin-submit primary-fl-btn"
            style={{ background: '#315efb', color: '#fff', marginTop: '30px' }}
          >
            Войти
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default withRouter(connect(
  (state) => ({
    user: state.currentUser,
  }),
  {
    submitLoginInformation,
  },
)(SignIn));
