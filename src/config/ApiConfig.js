/* eslint-disable no-param-reassign */

import axios from 'axios';
import store from '../store/index';

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const token = store.state.API_TOKEN;
    if (token) config.headers['X-AUTH-TOKEN'] = token;
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  error => Promise.reject(error),
);

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common.Accept = 'application/json';

export default api;
