import {
  CREATE_COMMENT,
} from '../actions/comments';


const comments = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default comments;
