import axios from 'axios';

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
