import { combineReducers } from 'redux';
import { currentUser, user } from './user';
import categories from './categories';
import comments from './comments';
import { projects, project } from './projects';

const rootReducer = combineReducers({
  currentUser,
  user,
  categories,
  comments,
  projects,
  project,
});

export default rootReducer;
