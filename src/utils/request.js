import axios from "axios";
const url = {
  development: "/",
  production: ""
};

console.log("当前环境", process.env.NODE_ENV);
const request = axios.create({
  baseURL: url[process.env.NODE_ENV]
});
export default request;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
