import { useHistory } from 'react-router-dom';
import config from '../config';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const GET_USER = 'GET_USER';
// export const UPDATE_USER = 'UPDATE_USER';

export const submitLoginInformation = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`${config.protocol}://${config.server}:${config.port}/api/login`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        body: JSON.stringify(credentials),
      },
    });
    const json = await response.json();
    console.log('json', json);
    if (!response.ok) {
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        // payload: json.user,
      });
      localStorage.setItem('token', json);
      const history = useHistory();
      history.push('/projects');
      return;
    }

    dispatch({
      type: 'USER_LOGIN_FAILURE',
      payload: 'Введены неверные пользовательские данные',
    });
  } catch (err) {
    console.error(err);
  }
};
export const getUserInformation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`${config.protocol}://${config.server}:${config.port}/api/users/${id}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch({
        type: 'GET_USER',
        payload: json.user,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
