import config from '../config';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const getCategories = () => async (dispatch) => {
  try {
    const response = await fetch(`http://${config.server}:${config.port}/categories/`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch({
        type: GET_CATEGORIES,
        payload: json,
      });
      return;
    }
    dispatch({
      type: GET_CATEGORIES,
      payload: json,
    });
    return;
  } catch (err) {
    console.error(err);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    const response = await fetch(`http://${config.server}:${config.port}/categories/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(category),
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch({
        type: CREATE_CATEGORY,
        payload: json,
      });
      return;
    }
    dispatch({
      type: CREATE_CATEGORY,
      payload: json,
    });
    return;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await fetch(`http://${config.server}:${config.port}/categories/${categoryId}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch({
        type: DELETE_CATEGORY,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
