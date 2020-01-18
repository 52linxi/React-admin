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
//获取列表数据请求
export const reqGetCategoryList = () => {
  return axiosInstance({
    //域名地址
    url: '/category/get',
    //请求方式
    method: 'GET',
  })
}

//请求添加列表数据请求
export const reqAddCategory = (categoryName) => {
  return axiosInstance({
    //域名地址
    url: '/category/add',
    //请求方式
    method: 'POST',
    data: {
      categoryName
    }
  })
}