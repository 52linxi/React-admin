import React from "react";
import axios from "axios";
import { message } from "antd";

export default function Test() {
  //配置axios的拦截器 自定义axios配置 修改默认配置
  const axiosInstance = axios.create({
    //公共路劲名
    baseURL: "/api",
    //超时时间
    timeout: 10000,
    //公共代码
    headers: {}
  });

  //设置axios的拦截机
  //请求拦截器
  axiosInstance.interceptors.request.use(
    config => {
      //console.log(config);

      //请求拦截器第一件事就是判断token，给请求头添加公共的token
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      //请求拦截器第二件事就是请求是否需要'application/x-www-form-urlencoded'，Json是默认的
      if (config.method === "post") {
        //获取config.data的所有属性
        const keys = Object.keys(config.data);
        //console.log(keys);

        // console.log(config.data);
        const data = keys
          .reduce((prev, curr) => {
            prev += `&${curr}=${config.data[curr]}`;
            return prev;
          }, "")
          .slice(1); //多一个&符截取掉
        config.data = data;
        config.headers["content-type"] = "application/x-www-form-urlencoded";
      }

      return config;
    }
    //失败的请求拦截器一般不用
    // ()=>{}
  );

  //响应拦截器  主要查看状态码判断成功还是失败
  axiosInstance.interceptors.response.use(
    response => {
      console.log(response);

      if (response.data.status === 0) {
        return response.data.data;
      } else {
        return Promise.reject(response.data.msg);
      }
    },
    //失败的拦截器
    err => {
      const errCode = {
        401: "没有权限访问当前接口",
        403: "禁止访问当前",
        404: "当前的资源未找到",
        500: "服务器发生问题，请重新试试"
      };

      let errMessage = "";

      if (err.response) {
        errMessage = errCode[err.response.status];
      } else {
        if (err.message.indexOf("Network Error")) {
          errMessage = "网络连接错误，请连接WIFI";
        } else if (err.message.indexOf("timeout")) {
          errMessage = "网络连接超时,请连接WIFI";
        }
      }

      return Promise.reject(errMessage || "服务器发生问题,请联系管理员");
    }
  );

  //令牌token
  let token = "";
  //添加返回的id
  let id = "";

  const handleClick1 = () => {
    axiosInstance({
      method: "POST",
      url: "/login",
      data: {
        username: "admin",
        password: "admin"
      }
    })
      .then(response => {
        console.log(response);

        /*   //判断状态 返回成功或者失败
        if (response.data.status === 0) {
          console.log(response);

          token = response.data.data.token;
          message.success("登录成功");
        } else {
          message.error(response.data.msg);
        } */
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      });
  };

  const handleClick2 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/add",
      data: {
        categoryName: "手机"
      },
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          //id 添加成功返回的id
          id = response.data.data._id;
          message.success("添加成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      });
  };

  const handleClick3 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/delete",
      data: {
        categoryId: id
      },
      headers: {
        //token一定要加上Bearer
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success("删除分类成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}

//下面是发axios请求最基本最基本的用法(不推荐 代码重复太多)
//#region
/* export default function Test() {
  //表面token
  let token = "";
  //添加返回的id
  let id = "";

  const handleClick1 = () => {
    axios({
      method: "POST",
      url: "/api/login",
      data: {
        username: "admin",
        password: "admin"
      }
    })
      .then(response => {
          //判断状态 返回成功或者失败
        if (response.data.status === 0) {
          console.log(response);
          
          token = response.data.data.token;
          message.success("登录成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  const handleClick2 = () => {
    axios({
      method: "POST",
      url: "/api/category/add",
      data: {
        categoryName: "手机"
      },
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          //id 添加成功返回的id
          id = response.data.data._id;
          message.success("添加成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  const handleClick3 = () => {
    axios({
      method: "POST",
      url: "/api/category/delete",
      data: {
        categoryId: id
      },
      headers: {
        //token一定要加上Bearer
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success("删除分类成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
} */
//#endregion
