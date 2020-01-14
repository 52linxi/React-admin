import React, { Component } from "react";
//antd 插件库
import { Form, Icon, Input, Button, message } from "antd";
import { connect } from "react-redux";
//引入异步操作的方法
import { saveUserAsync } from "../../redux/action";
//判断是否登陆过  高阶组件
import withCheckLogin  from '../with-check-login'
//登录界面的logo图
import logo from "./logo.png";
import "./index.less";
//
const { Item } = Form;
@withCheckLogin
//异步请求中间件
@connect(null, { saveUserAsync })
//antd的中间件 提取from属性
@Form.create()
//登录界面以及逻辑
class login extends Component {
  //自定义表单正则
  validator = (rule, value, callback) => {
    //rule.field 表单的key
    //value 表单的值
    //console.log(rule,value);

    //判断正则当前检验的是用户还是密码
    const name = rule.field === "username" ? "用户名" : "密码";
    //定义正则英文字母、数字、下划线
    const reg = /^\w+$/;
    if (!value) {
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!reg.test(value)) {
      callback(`${name}只能包含英文字母、数字、下划线`);
    }

    //必须要调用一次
    callback();
  };

  //提交数据逻辑
  Login = e => {
    //禁止默认行为
    e.preventDefault();
    //validateFields方法  检验表单正则和收集表单数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        const { username, password } = values;
        // #region
        /* //请求参数
        const { username, password } = values;
        // 发送请求
        axios
          .post("/api/login", { username, password })
          .then(response => {
            // 判断是否登录成功
            if (response.data.status === 0) {
              //跳转home 使用replace 不用保留登录历史记录
              this.props.history.replace("/");
            } else {
              // 提示登录错误
              message.error(response.data.msg);

              // 清空密码
              this.props.form.resetFields(["password"]);
            }
          })
          .catch(err => {
            // 打印错误给开发人员看
            console.log(err);
            // 提示错误给用户看
            message.error("网络错误~");
            // 清空密码
            this.props.form.resetFields(["password"]);
          }); */
        //#endregion
        this.props
        //发送请求
          .saveUserAsync(username, password)
          //成功跳转页面
          .then(() => {
            this.props.history.replace("/");
          })
          //失败就提示错误和清空数据
          .catch(msg => {
            message.error(msg);
            this.props.form.resetFields(["password"]);
          });
      }
    });
  };

  render() {
    //getFieldDecorator 方法 表单正则
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form className="login-form" onSubmit={this.Login}>
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                className="login-form-btn"
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

//Form.create()(login) 给login传递From对象
export default login;
