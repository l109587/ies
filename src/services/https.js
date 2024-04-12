import axios from 'axios';
import { setToken, getToken } from '@/utils/store';
import { stringify } from 'qs';
import { message } from 'antd';

const instance = axios.create({
  timeout: 1000 * 10, // 设置超时时间10s
  baseURL: process.env.NODE_ENV === 'development' ? '' : '',
  withCredentials: true, // 允许携带cookie
});

// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.withCredentials = false; // 允许携带cookie

let httpCode = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求体有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (getToken) {
      config.headers['token'] = getToken();
    }
    if (config.url.includes('pur/contract/export')) {
      config.headers['responseType'] = 'blob';
    }
    if (config.url.includes('upload?target')) {
      config.headers['Content-Type'] = 'authorization-text';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return Promise.resolve(response.data);
    } else if (response.data.code == '300' || response.data.code == '100') {
      message.error(response.data.msg);
      return Promise.reject(response.data.message);
    } else if (response.data.code == '400') {
      message.error(response.data.msg);
      return Promise.reject(response.data.message);
    } else if (response.data.error == '-1') {
      message.error('格式不正确，请重新上传');
      return Promise.reject(response.data.message);
    } else if (response.data.type) {
      return Promise.resolve(response);
    } else if (
      response.data.code == '421' ||
      (response.data.code == '420' && response.data.success == false)
    ) {
      // store.set('login', false)
      // store.set('luser', {})
      // store.set('isInit', false)
      setToken('');
      location.href = '/login';
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      let tips =
        error.response.status in httpCode
          ? httpCode[error.response.status]
          : error.response.data.message;
      // message.error(tips)
      let arr = error.response.request.responseURL;
      if (arr.substring(arr.lastIndexOf('/') + 1) == 'resumefactory') {
        // store.set('login', false)
        // store.set('luser', {})
        // store.set('isInit', false)
        setToken('');
        location.href = '/login';
      }
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    } else {
      return Promise.reject('请求超时, 请刷新重试');
    }
  },
);

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAsync = (url, params, config = {}) => {
  return instance({
    method: 'get',
    url,
    data: stringify({
      token: getToken(),
    }),
    ...config,
  });
};

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data: stringify({
        token: getToken(),
        ...data,
      }),
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postAsync = (url, data, config = {}) => {
  return instance({
    method: 'post',
    url,
    data: stringify({
      token: setToken(),
      ...data,
    }),
    ...config,
  });
};

/* 统一封装put请求  */
export const put = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'put',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求上传  */
export const Update = (url, data, config) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      timeout: 10000 * 6 * 10,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装文件下载  */
export const fileDown = (url, data, config) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data: stringify({
        token: getToken(),
        ...data,
      }),
      responseType: 'blob',
      timeout: 10000 * 3 * 10,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
