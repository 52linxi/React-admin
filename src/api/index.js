/*
不同的请求功能封装 
*/

import axiosInstance from './request'

//登录请求
export const reqLogin = (username, password) => {
  return axiosInstance({
    //域名地址
    url: '/login',
    //请求方式
    method: 'POST',
    //请求数据
    data: {
      username,
      password
    }
  })
}