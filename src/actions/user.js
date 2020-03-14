import { useHistory } from 'react-router-dom';
import config from '../config';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const submitLoginInformation = (credentials) => async (dispatch) => {
  try {
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
      const history = useHistory();
      history.push('/requests');
      return;
    }

    dispatch({
      type: 'USER_LOGIN_FAILURE',
      payload: json.error,
    });
  } catch (err) {
    console.error(err);
  }
};
