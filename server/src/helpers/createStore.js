import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

const ROOT_URL = 'https://react-ssr-api.herokuapp.com';

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: ROOT_URL,
    headers: { cookie: req.get('cookie') || '' },
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance),
  ));

  return store;
}