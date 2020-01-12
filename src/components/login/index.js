import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

import logo from "./logo.png";
import "./index.less";
@Form.create()
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
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
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
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
            <Form.Item>
              <Button className="login-form-btn" type="primary">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

//Form.create()(login) 给login传递From对象
export default login;
