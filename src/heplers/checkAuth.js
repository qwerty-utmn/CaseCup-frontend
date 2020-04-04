import store from '../store';

const checkAuth = () => {
  const { currentUser } = store.getState();
  const token = localStorage.getItem('token');
  return Boolean(token) || Boolean(currentUser.user_id)
};

export default checkAuth;
