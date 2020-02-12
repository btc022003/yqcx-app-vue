import axios from 'axios';

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  baseURL: 'http://localhost:7001',
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

export function get(url, params) {
  return service.get(url, {
    params
  });
}

export function post(url, data) {
  return service.post(url, data);
}

export function del(url) {
  return service.delete(url);
}

export function put(url, data) {
  return service.put(url, data);
}

export default service;
