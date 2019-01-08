import axios from 'axios';
import store from '../store/index';

let api = axios.create();

api.interceptors.request.use(
  function(config) {
    let token = store.state.API_TOKEN;
    if (token) config.headers['X-AUTH-TOKEN'] = token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function(config) {
    let token = store.state.API_TOKEN;
    if (token) config.headers['X-AUTH-TOKEN'] = token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['Accept'] = 'application/json';

export default api;
