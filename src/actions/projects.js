import config from '../config';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getProjects = (filter = 'start_datetime', sort = 'desc', search = '') => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/by?filter=${filter}&sort=${sort}&search=${search}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log('response', json);
    if (response.ok) {
      dispatch({
        type: GET_PROJECTS,
        payload: json,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(project),
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: CREATE_PROJECT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/${id}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: GET_PROJECT,
        payload: json,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateProject = (project, id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(project),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: UPDATE_PROJECT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (response.ok) {
      dispatch({
        type: DELETE_PROJECT,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const createReaction = (project_id, reaction) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/reactions/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        project_id,
        reaction: +reaction,
        user_id: 1,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: UPDATE_PROJECT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
