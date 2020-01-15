/**
 * 
 * 用来创建action对象工厂函数模块
 * 
 */
import { SAVE_SUER,REMOVE_USER,CHANGE_LANGUAGE} from './action-type'
import {  reqLogin} from '../api';
import {setItem} from '../utils/storage'
//同步action  不暴露 便于下面异步使用 请求登录保存用户数据
const saveUser = (user) => ({ type: SAVE_SUER, data: user})
//同步action  删除redux 数据 退出登录
export const removeUser = ()=>({type: REMOVE_USER})
//同步action 切换国际化语言状态
export const changeLanguage = (lang)=>({type: CHANGE_LANGUAGE,data:lang})

 

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