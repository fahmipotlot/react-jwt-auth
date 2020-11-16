import http from "../http-common";
import authHeader from './auth-header';

const getAll = () => {
  // return axios.get(API_URL + 'user', { headers: authHeader() });
  return http.get("/articles", { headers: authHeader() });
};

const get = id => {
  return http.get(`/articles/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/articles", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/articles/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/articles/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/articles`, { headers: authHeader() });
};

const findByTitle = title => {
  return http.get(`/articles?title=${title}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};