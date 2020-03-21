import {
  GET_REQUESTS,
  GET_REQUEST,
  UPDATE_REQUEST,
  DELETE_REQUEST,
} from '../actions/requests';


export const requests = (state = [], action) => {
  switch (action.type) {
    case GET_REQUESTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const request = (state = {}, action) => {
  switch (action.type) {
    case GET_REQUEST: {
      return action.payload;
    }
    case UPDATE_REQUEST: {
      return action.payload;
    }
    case DELETE_REQUEST: {
      return {};
    }
    default: {
      return state;
    }
  }
};
