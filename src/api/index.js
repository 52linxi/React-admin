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

//请求修改列表数据请求
export const reqUpdateCategory = (categoryId, categoryName) => {
  return axiosInstance({
    //域名地址
    url: '/category/update',
    //请求方式
    method: 'POST',
    data: {
      categoryName,
      categoryId
    }
  })
}

//请求删除列表数据请求
export const reqDeleteCategory = (categoryId) => {
  return axiosInstance({
    //域名地址
    url: '/category/delete',
    //请求方式
    method: 'POST',
    data: {

      categoryId
    }
  })
}

//获取商品列表数据请求
export const reqGetProductList = (pageNum, pageSize) => {
  return axiosInstance({
    //域名地址
    url: '/product/list',
    //请求方式
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

//请求添加商品列表数据
export const reqAddProduct= ({name,desc,price,detail,categoryId}) => {
  return axiosInstance({
    //域名地址
    url: '/product/add',
    //请求方式
    method: 'POST',
    data: {
      name,desc,price,detail,categoryId
    }
  })
}

//请求修改商品列表数据
export const reqUpdateProduct= ({name,desc,price,detail,categoryId,productId}) => {
  return axiosInstance({
    //域名地址
    url: '/product/update',
    //请求方式
    method: 'POST',
    data: {
      name,desc,price,detail,categoryId,productId
    }
  })
}

//请求搜索商品列表数据
export const reqSearchProduct= ({searchType,searchValue,pageNum,pageSize}) => {
  return axiosInstance({
    //域名地址
    url: '/product/search',
    //请求方式
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      [searchType]:searchValue
    }
  })
}