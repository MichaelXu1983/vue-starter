import axios from "axios";
import Vue from "vue";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true // 跨域请求携带凭据
});

// request 请求拦截（可以改变 url 或 options）
service.interceptors.request.use(
  config => {
    // 需要在请求之前，执行的方法放这里
    return config;
  },
  error => {
    // 此处可以捕获请求出错时，做自定义统一处理
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone 响应拦截
service.interceptors.response.use(
  /**
   * 如果此处不想做任何响应后的处理，就直接返回 response => response
   */
  response => response,

  /**
   * 此处可以对服务端返回，做自定义统一处理
   */
  // response => {
  //   const res = response.data;

  //   if (res.code === 401.1) {
  //     console.error(codeMessage[res.code]);
  //     store.dispatch("user/logout").then(() => {
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1500);
  //     });
  //     return Promise.reject(new Error(res.message || "Error"));
  //   } else {
  //     return res;
  //   }
  // },

  /**
   * 此处可以捕获 HTTP 错误，做自定义统一处理
   */
  error => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error(codeMessage[status]);
        window.location.href = "/exception/403";
      }
      if (status === 403) {
        console.error(codeMessage[status]);
        window.location.href = "/exception/403";
      }
      if (status <= 504 && status >= 500) {
        console.error(codeMessage[status]);
        window.location.href = "/exception/500";
      }
      if (status >= 404 && status < 422) {
        console.error(codeMessage[status]);
        window.location.href = "/exception/404";
      }
    }
    return Promise.reject(error);
  }
);
Vue.prototype.$http = service; // 注册全局service

export default service;
