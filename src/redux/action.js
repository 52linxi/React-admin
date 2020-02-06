/**
 * 
 * 用来创建action对象工厂函数模块
 * 
 */
import {
  SAVE_SUER,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from './action-type'
import {
  reqLogin,
  reqGetCategoryList,
  reqAddCategory,
  reqUpdateCategory,
  reqDeleteCategory
} from '../api';
import {
  setItem
} from '../utils/storage'
//同步action  不暴露 便于下面异步使用 请求登录保存用户数据
const saveUser = (user) => ({
  type: SAVE_SUER,
  data: user
})
//同步action  删除redux 数据 退出登录
export const removeUser = () => ({
  type: REMOVE_USER
})
//同步action 切换国际化语言状态
export const changeLanguage = (lang) => ({
  type: CHANGE_LANGUAGE,
  data: lang
})
//同步action 获取数据列表
export const getCategoryList = (categories) => ({
  type: GET_CATEGORY_LIST,
  data: categories
})
//同步action 请求添加数据列表
export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  data: category
})




//异步action  发送登录请求
export const saveUserAsync = (username, password) => {
  return (dispatch) => {
    return reqLogin(username, password)
      .then(response => {
        //存储用户数据和token
        // redux(内存存储 刷新数据就会被清空)
        //localstorage 持久性存储
        setItem('user', response)
        //触发更新
        dispatch(saveUser(response))
      })
  }
}

//异步action 发送获取列表分类
export const getCategoryListAsync = () => {
  return (dispatch) => {
    return reqGetCategoryList()
      .then(response => {
        //触发更新
        dispatch(getCategoryList(response))
      })
  }
}

//异步action 发送添加列表分类
export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    return reqAddCategory(categoryName)
      .then(response => {
        //触发更新
        dispatch(addCategory(response))
      })
  }
}


//同步action 请求修改数据列表
 const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  data: category
})


//异步action 发送修改列表分类
export const updateCategoryAsync = (categoryId,categoryName) => {
  return (dispatch) => {
    return reqUpdateCategory(categoryId,categoryName)
      .then(response => {
        //触发更新
        dispatch(updateCategory(response))
      })
  }
}

//同步action 请求删除数据列表
const deleteCategory = (id) => ({
  type: DELETE_CATEGORY,
  data: id
})


//异步action 发送删除列表分类
export const deleteCategoryAsync = (categoryId) => {
  return (dispatch) => {
    return reqDeleteCategory(categoryId)
      .then(response => {
        //触发更新
        dispatch(deleteCategory(response))
      })
  }
}