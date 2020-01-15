/**
 * 
 * 用来创建action对象工厂函数模块
 * 
 */
import { SAVE_SUER,REMOVE_USER} from './action-type'
import {  reqLogin} from '../api';
import {setItem} from '../utils/storage'
//同步action 不暴露 便于下面异步使用
const saveUser = (user) => ({ type: SAVE_SUER, data: user})

export const removeUser = ()=>({type: REMOVE_USER})

 
 


//异步action 
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