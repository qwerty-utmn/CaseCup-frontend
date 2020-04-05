import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  GET_USER,
  UPDATE_USER,
  GET_USER_MARKED_PROJECTS,
  GET_USER_PROJECTS,
  CLEAR_USER,
} from '../actions/user';

const INITIAL_STATE = {};
export const currentUser = (state = INITIAL_STATE, action) => {
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
    case UPDATE_USER: {
      return {
        ...state,
        currentUser: {
          ...action.payload.user,
        },
      };
    }
    case CLEAR_USER: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        ...action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
