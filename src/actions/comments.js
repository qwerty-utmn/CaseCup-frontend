import config from '../config';

// export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
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

export const createComment = (content, userId) => async (dispatch) => {
  try {
    const comment = {
      content,
      user_id: userId,
    };
    const response = await fetch(`http://${config.server}:${config.port}/comments/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
        body: JSON.stringify(comment),
      },
    });
    const json = await response.json();

    if (!response.ok) {
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
