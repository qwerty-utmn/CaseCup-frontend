import {
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT,
} from '../actions/projects';

export const projects = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const project = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT: {
      return action.payload;
    }
    case CREATE_PROJECT: {
      return action.payload;
    }
    case UPDATE_PROJECT: {
      return action.payload;
    }
    case DELETE_PROJECT: {
      return {};
    }
    default: {
      return state;
    }
  }
};
