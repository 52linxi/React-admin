/**
 * 封装axios
 */
import axios from 'axios';
import store from '../redux/store'
import { message } from 'antd';
//引入外部状态码文件
import errCode from '../config/errCode';
import { removeItem } from '../utils/storage'
import { removeUser } from '../redux/action';
//配置axios 
const axiosInstance = axios.create({
  //公共的请求路劲
  baseURL: '/api',
  //请求超过时间
  timeout: 10000,
  //公共请求头参数
  headers: {

  }
})
//请求拦截器
axiosInstance.interceptors.request.use(

  (config) => {
    //token初始化处理
    const token = store.getState().user.token;
    //请求第一件事 检查tpken
    if (token) {
      config.headers.authorization = `bearer ${token}`
    }
    //请求第二件事 POST请求的 x-www-from-urlencoded
    if (config.method === 'POST') {
      config.data = Object.keys(config.data)
        .reduce((prev, curr) => {

          prev += `&${curr}=${config.data[curr]}`

          return prev
        }, '').slice(1)
      config.headers['content-type'] = 'application/x-www-from-urlcoded'
    }

    return config
  }

)
//响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    //判断状态返回想要的值
    if (response.data.status === 0) {
      return response.data.data
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  (err) => {
    //判断不同错误，提示不同错误

    let errMsg = '';

    if (err.response) {
      // 接受到响应了，但是响应是失败的
      // 根据响应状态码判断错误类型
      const status = err.response.status;
      errMsg = errCode[status];

      if (status === 401) {
        // token过期了
        //登录检查就会跳转到login
        removeItem('user');
        // 触发redux更新
        store.dispatch(removeUser());

        message.error('登录过期，请重新登录~');
      }

    } else {
      //没有接收到响应 返回的错误
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络连接错误，请连接网络";
      } else if (err.message.indexOf("timeout" !== -1)) {
        errMsg = "网络连接超时,请连接WIFI";
      }
    }
    return Promise.reject(errMsg || '服务器错误,请联系管理员')
  },
)

export default axiosInstance;