/**
 * 封装axios
 */
import axios from 'axios';
//引入外部状态码文件
import errCode from '../config/errCode';
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
    let token = '';
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
      //接收到响应 但是返回的错误
      errMsg = errCode[err.response.status]
    } else {
      //没有接收到响应 返回的错误
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络连接错误，请连接网络";
      } else if (err.message.indexOf("timeout" !== -1)) {
        errMessage = "网络连接超时,请连接WIFI";
      }
    }
    return Promise.reject(errMsg || '服务器错误,请联系管理员')
  },
)

export default axiosInstance;