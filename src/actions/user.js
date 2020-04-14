import config from '../config';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const GET_USER = 'GET_USER';
export const GET_USER_PROJECTS = 'GET_USER_PROJECTS';
export const GET_USER_MARKED_PROJECTS = 'GET_USER_MARKED_PROJECTS';
export const UPDATE_USER = 'UPDATE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const OPEN_ALERT = 'OPEN_ALERT';

export const submitLoginInformation = (credentials, history) => async (dispatch) => {
  try {
    console.log('credentials', credentials);
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/auth`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const token = await response.text();
      localStorage.setItem('token', token);
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: {},
      });
      history.push('/projects');
      return;
    }

    dispatch({
      type: 'USER_LOGIN_FAILURE',
      payload: 'Неверное имя пользователя или пароль',
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
    console.log(json);
    if (response.ok) {
      dispatch({
        type: 'GET_USER',
        payload: { user: json },
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

    if (response.ok) {
      dispatch({
        type: 'GET_USER_PROJECTS',
        payload: json,
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

    if (response.ok) {
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

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/users/${user.user_id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: 'UPDATE_USER',
        payload: json,
      });
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: { text: 'Данные пользователя успешно обновлены', type: 'success' },
        },
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserByToken = (token) => async (dispatch) => {
  try {
    const response = await fetch(`http://${config.server}:${config.port}/users/by_token`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ token }),
    });
    const user = await response.json();
    if (response.ok) {
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: user,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const clearUser = (history) => (dispatch) => {
  localStorage.removeItem('token');
  history.push('/signin');
};
