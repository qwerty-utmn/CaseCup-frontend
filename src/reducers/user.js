import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  GET_USER,
  UPDATE_USER,
  GET_USER_MARKED_PROJECTS,
  GET_USER_PROJECTS,
} from '../actions/user';

const INITIAL_STATE = {};
const currentUser = (state = INITIAL_STATE, action) => {
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
    case GET_USER_PROJECTS:
    case GET_USER_MARKED_PROJECTS: {
      return {
        ...state,
        userProjects: {
          ...action.payload.projects,
        },
      };
    }
    case GET_USER: {
      return {
        ...state,
        ...action.payload.user,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        currentUser: {
          ...action.payload.user,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default currentUser;
