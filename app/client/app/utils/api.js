import axios from 'axios';

// const hostName = NODE_ENV === 'development' ? 'localhost:8101' : window.location.host; // TODO use

const CLIENT_ROOT_URL = 'http://localhost:3000';
const API_URL = `${CLIENT_ROOT_URL}/api`;

const instance = axios.create({
  baseURL: API_URL
});

const setAuthenticationHeader = (accessToken) => {
  instance.defaults.headers.common['Authorization'] = accessToken;
};

const post = (url, data) => {
  return instance.post(`${API_URL}${url}`, data);
};

const get = (url) => {
  return instance.get(`${API_URL}${url}`);
};

export default {
  setAuthenticationHeader,
  post,
  get
}
