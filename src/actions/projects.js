import config from '../config';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const getProjects = (filter = {}, sort = {}, search_string = '') => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        body: JSON.stringify({ filter, sort, search_string }),
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch({
        type: GET_PROJECTS,
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

    if (!response.ok) {
      dispatch({
        type: GET_PROJECT,
        payload: json.data,
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
        body: JSON.stringify(project),
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!response.ok) {
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

    if (!response.ok) {
      dispatch({
        type: DELETE_PROJECT,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const reactionChange = (projectId, reaction) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/${projectId}/reaction`, {
      method: 'post',
      'Content-type': 'application/json; charset=UTF-8',
      body: JSON.stringify(reaction),
    });
    const json = await response.json();

    if (!response.ok) {
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
