import {
  axios
} from './config.js';

// 例子 1
export const aApi1Name = params => axios.post(url, params);
// 例子 2
export const aApi2Name = params => axios.get(url, params);

export const aRegister = params => axios.post('http://127.0.0.1:8000/api/register', {
  params,
});

export const atRegister = params => axios.post('http://127.0.0.1:8000/api/tRegister', {
  params,
});

export const aLogin = params => axios.post('http://127.0.0.1:8000/api/login', {
  params,
});

export const atLogin = params => axios.post('http://127.0.0.1:8000/api/tLogin', {
  params,
});

export const aStudentInfo = params => axios.post('http://127.0.0.1:8000/api/studentInfo', params);

export const aUpdateStudentInfo = params => axios.post('http://127.0.0.1:8000/api/update', params);

export const aInsertStudentInfo = params => axios.post('http://127.0.0.1:8000/api/insertInfo', params);