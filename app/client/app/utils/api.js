import axios from 'axios';

// const hostName = NODE_ENV === 'development' ? 'localhost:8101' : window.location.host; // TODO use

const CLIENT_ROOT_URL = 'http://localhost:3000';
const API_URL = `${CLIENT_ROOT_URL}/api`;

const post = (url, data) => {
  return axios.post(`${API_URL}${url}`, data);
};

const get = (url) => {
  return axios.get(`${API_URL}${url}`);
};

export default {
  post,
  get
}
