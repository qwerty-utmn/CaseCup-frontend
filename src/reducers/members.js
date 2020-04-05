import {
  BECOME_MEMBER,
} from '../actions/members';


const members = (state = [], action) => {
  switch (action.type) {
    case BECOME_MEMBER: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default members;
