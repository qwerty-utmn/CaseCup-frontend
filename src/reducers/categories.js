import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from '../actions/categories';


const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return action.payload;
    }
    case CREATE_CATEGORY: {
      return [...state, action.payload];
    }
    case DELETE_CATEGORY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default categories;
