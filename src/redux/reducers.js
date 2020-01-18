/**
 *
 * 用来根据prevState和action生成newState函数模块
 */
import {combineReducers} from "redux";
import { SAVE_SUER,REMOVE_USER,CHANGE_LANGUAGE,GET_CATEGORY_LIST,ADD_CATEGORY} from './action-type'
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


//定义国际化语言
const langInit = navigator.language || navigator.languages[0] || "zh-CN";
function language(prevState = langInit, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data
    default:
      return prevState;
  }
}

//定义获取列表数据
const categoresInit = []
function categories(prevState = categoresInit, action) {
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return action.data
    case ADD_CATEGORY:
      return [...prevState,action.data]
    default:
      return prevState
  }
}
export default combineReducers({
  user,
  language,
  categories
});