/**
 *
 * 用来根据prevState和action生成newState函数模块
 */
import {combineReducers} from "redux";
import { SAVE_SUER,REMOVE_USER} from './action-type'
import { getItem} from '../utils/storage'
 //初始化默认 使用storage的读取方法 将数据存在reduers
const initUser = getItem('user') || {};
//定义用户保存数据
function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_SUER:
      return action.data;
    case REMOVE_USER:
      return {};
    default:
      return prevState;
  }
}

function bbb(prevState = "许褚", action) {
  switch (action.type) {


    default:
      return prevState;
  }
}

export default combineReducers({
  user,
  bbb
});