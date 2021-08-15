import axios from 'axios';

const ROOT_URL = 'https://react-ssr-api.herokuapp.com';

export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/users`);

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
