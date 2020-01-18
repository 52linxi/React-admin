import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function WithCheckLogin(WrappedComponent) {
  @connect(state => ({ user: state.user }), null)
  class CheckLogin extends Component {
    static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;
    render() {
      const {
        user: { token },
        location: { pathname }
      } = this.props;
      //判断token
      if (token) {
        // 登录过
        if (pathname === "/login") {
          // 跳转到主页
          return <Redirect to="/" />;
        }
      } else {
        // 没有登录过
        if (pathname !== "/login") {
          // 跳转到主页
          return <Redirect to="/login" />;
        }
      }

      return <WrappedComponent {...this.props} />;
    }
  }
  return CheckLogin;
}
