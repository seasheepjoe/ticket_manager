import axios from 'axios';
//import store from '../store/index';

let api = axios.create();

//api.defaults.headers.common['X-AUTH-TOKEN'] = store.state.API_TOKEN;
api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['Accept'] = 'application/json';

export default api;
