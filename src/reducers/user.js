import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  GET_USER,
  UPDATE_USER,
} from '../actions/user';

const INITIAL_STATE = {};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: {
          ...action.payload.user,
        },
        error: '',
      };
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: {
          ...action.payload.user,
        },
      };
    }
    // case UPDATE_USER: {
    //   return {
    //     ...state,
    //     user: {
    //       ...action.payload.user,
    //     },
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default user;
