export const CLEAR_ALERT = 'CLEAR_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const OPEN_ALERT = 'OPEN_ALERT';

export function handleError(dispatch, err, callBackIfLocalErr) {
  if (err.response.data.type === 'local') {
    callBackIfLocalErr();
  } else {
    dispatch({
      type: OPEN_ALERT,
      payload: { message: { text: err.response.data.text, type: 'error' } },
    });
  }
}
export function closeAlert() {
  return (dispatch) => dispatch({
    type: CLOSE_ALERT,
  });
}
export function openAlert(message) {
  return (dispatch) => dispatch({
    type: OPEN_ALERT,
    payload: message,
  });
}
