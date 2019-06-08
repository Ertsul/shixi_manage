import axios from 'axios';
// import qs from 'qs';

axios.defaults.withCredentials = false;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const userInfo = localStorage.getItem('userInfo');
if (userInfo) {
  axios.defaults.headers.post['Authorization'] = `Bearer ${JSON.parse(userInfo).token}`;
  console.log('----------------------', JSON.parse(localStorage.getItem('userInfo')).token);
}
// 请求拦截器
// axios.interceptors.request.use(
//   request => {
//     console.warn(request.url);
    // request.data = request.data || {};
    // const hasHttp = /^http(|s):\/\//.test(request.url);
    // if (!hasHttp) { // 无 http or https 头处理
    //   request.url = `https://${request.url}`;
    // }
    // if (request.data) {
    //   request.data = {
    //     // commom: '', 这里可以添加一些公共的请求参数
    //     data: JSON.stringify(request.data)
    //   };
    //   // request.data = qs.stringify(request.data);
    // }
    // return request;
//   },
//   error => Promise.reject(error)
// );
// // 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     const responseData = response.data;
//     // if (responseData.errcode !== 0) { // 错误处理
//     //   return Promise.reject(responseData.msg || '未知错误');
//     // }
//     // responseData.result = responseData.result || {};
//     return responseData;
//   },
//   error => Promise.reject(error)
// );

export {
  axios
};