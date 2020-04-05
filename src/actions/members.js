import config from '../config';

export const BECOME_MEMBER = 'BECOME_MEMBER';

export const becomeMember = (projectId, userId) => async (dispatch) => {
  try {
    const member = {
      project_id: projectId,
      user_id: userId,
      role: 'Участник',
    };
    const response = await fetch(`http://${config.server}:${config.port}/members/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(member),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: BECOME_MEMBER,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
