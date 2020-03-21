import config from '../config';

export const GET_REQUESTS = 'GET_REQUESTS';
export const GET_REQUEST = 'GET_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';

export const getRequests = (filter = {}, sort = {}, search_string = '') => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/api/requests`, {
      method: 'post',
      'Content-type': 'application/json; charset=UTF-8',
      body: JSON.stringify({ filter, sort, search_string }),
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: GET_REQUESTS,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getRequest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/api/requests/${id}`, {
      method: 'get',
      'Content-type': 'application/json; charset=UTF-8',
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: GET_REQUEST,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateRequest = (request, id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/api/requests/${id}`, {
      method: 'put',
      'Content-type': 'application/json; charset=UTF-8',
      body: JSON.stringify(request),
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: UPDATE_REQUEST,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/api/requests/${id}`, {
      method: 'delete',
      'Content-type': 'application/json; charset=UTF-8',
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: DELETE_REQUEST,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const addReaction = (request_id, reactionType) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/api/requests/${id}/reaction`, {
      method: 'post',
      'Content-type': 'application/json; charset=UTF-8',
      body: JSON.stringify(reactionType),
    });
    const json = await response.json();

    if (!json.error) {
      dispatch({
        type: UPDATE_REQUEST,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
