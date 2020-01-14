/*
封装locaoStorage 存储数据函数库

*/
//引用localstorage 方法
const localStorage = window.localStorage;
//读取数据语法
export function getItem(key) {
  const value = localStorage.getItem(key);
  try {
    //parse 将json格式变成数组或者对象
    return JSON.parse(value)
  } catch (e) {
    return value;
  }
}
//保存数据语法
export function setItem(key, value) {
  //stringify 将数组或者对象转换成JSON格式的字符串
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}
//删除数据语法
export function removeItem(key) {
  localStorage.removeItem(key);
}