import config from '../config';
// export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_PROJECT_COMMENT = 'CREATE_PROJECT_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';

// export const getComments = () => async (dispatch) => {
//   try {
//     const response = await fetch(`http://${config.server}:${config.port}/comments/`, {
//       method: 'get',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//         Authorization: localStorage.getItem('token'),
//       },
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       dispatch({
//         type: GET_COMMENTS,
//         payload: json.data,
//       });
//       return;
//     }
//     dispatch({
//       type: GET_COMMENTS,
//       payload: { comments: json.data },
//     });
//     return;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const createComment = (content, user, projectId, datetime) => async (dispatch) => {
  try {
    const comment = {
      content,
      user: { user_id: user.user_id },
      created_datetime: datetime,
      project_id: projectId,
    };
    dispatch({
      type: CREATE_PROJECT_COMMENT,
      payload: {
        user,
        content,
        created_datetime: datetime,
        project_id: projectId,
      },
    });
    const response = await fetch(`http://${config.server}:${config.port}/comments/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(comment),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: CREATE_COMMENT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
