import { combineReducers } from 'redux';
import { currentUser, user } from './user';
import categories from './categories';
import comments from './comments';
import { projects, project } from './projects';
import alert from './alertReducer';

const rootReducer = combineReducers({
  currentUser,
  user,
  categories,
  comments,
  projects,
  project,
  alert,
});

export default rootReducer;
