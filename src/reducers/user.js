import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from '../actions/user';

const INITIAL_STATE = {};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: '',
      };
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    default: break;
  }
};

export default user;
