import React, { Component } from "react";
//React路由
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//国际化语言
import { IntlProvider } from "react-intl";
//高阶组件
import { connect } from "react-redux";
//antd插件库
import { ConfigProvider } from "antd";
//主页组件
import Home from "./components/home";
//登录组件
import Login from "./containers/login";
//主要内容组件
import BasicLayout from "./components/basic-layout";
//自己写的语言包
import { zhCN, en } from "./locales";
//一下两个antd的语言包
import zh_CN from "antd/es/locale/zh_CN";
import zh_US from "antd/es/locale/en_US";

@connect(state => ({ language: state.language }), null)
class App extends Component {
  render() {
    //获取国际化语言
    const language = this.props.language;
    //复用代码
    const isEN = language === "en";

    return (
      //ConfigProvider  antd的国际化语言 对antd的组件有作用
      //IntlProvider 自己写的国际化语言
      <ConfigProvider locale={isEN ? zh_US : zh_CN}>
        <IntlProvider locale={language} messages={isEN ? en : zhCN}>
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <BasicLayout>
                <Route path="/" exact component={Home} />
              </BasicLayout>
            </Switch>
          </Router>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

export default App;
