import { useHistory } from 'react-router-dom';
import config from '../config';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const GET_USER = 'GET_USER';
export const GET_USER_PROJECTS = 'GET_USER_PROJECTS';
export const GET_USER_MARKED_PROJECTS = 'GET_USER_MARKED_PROJECTS';
export const UPDATE_USER = 'UPDATE_USER';

export const submitLoginInformation = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/login`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
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

export const getUserInformation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/users/${id}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!json.error) {
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

export const getUserProjects = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/users/${id}/projects`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: 'GET_USER_PROJECTS',
        payload: json.projects,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserMarkedProjects = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/users/${id}/marked-projects`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: 'GET_USER_PROJECTS',
        payload: json.projects,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateUserPhoto = (id, photo) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/users/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ id, user_photo: photo }),
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: 'UPDATE_USER',
        payload: json.user,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/users/${user.id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: 'UPDATE_USER',
        payload: json.user,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
