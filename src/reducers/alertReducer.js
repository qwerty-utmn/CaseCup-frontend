export const CLEAR_ALERT = 'CLEAR_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const OPEN_ALERT = 'OPEN_ALERT';

const initialState = {
  message: {
    type: '',
    text: '',
  },
  setAlertOpen: false,
};

const alert = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_ALERT:
      return {
        ...state,
        message: {},
        setAlertOpen: false,
      };
    case OPEN_ALERT:
      return {
        ...state,
        setAlertOpen: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default alert;
