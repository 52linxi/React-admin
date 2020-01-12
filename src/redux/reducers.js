/**
 *
 * 用来根据prevState和action生成newState函数模块
 */
import {
  combineReducers
} from "redux";

function aaa(prevState = "张辽", action) {
  switch (action.type) {


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
  aaa,
  bbb
});