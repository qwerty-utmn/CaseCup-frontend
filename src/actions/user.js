import { browserHistory } from 'react-router';
import config from '../config';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const sendLoginInformation = (credentials) => async (dispatch) => {
  dispatch({
    type: 'START_LOADING',
    payload: '',
  });
  const response = await fetch(`http://${config.server}:${config.port}/api/login`, {
    method: 'post',
    'Content-type': 'application/json; charset=UTF-8',
    body: JSON.stringify(credentials),
  });
  const json = await response.json();

  if (!json.error) {
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: json.user,
    });
    browserHistory.push('/requests');
    return;
  }

  dispatch({
    type: 'USER_LOGIN_FAILURE',
    payload: json.error,
  });
};
