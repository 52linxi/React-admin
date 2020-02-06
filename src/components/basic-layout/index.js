import { Layout} from "antd";
import React, { Component } from "react";
import {FormattedMessage} from 'react-intl'

//logo图
import logo from "../../assets/imgs/logo.png";
//less文件
import "./index.less";
//导航组件
import LeftNav from "./left-nav";
//头部组件
import HeaderMain from "./header-main";
//
import withCheckLogin from '../../containers/with-check-login'

const { Header, Content, Footer, Sider } = Layout;
@withCheckLogin
class BasicLayout extends Component {
  state = {
    collapsed: false,
    //定义文字的状态 需要隐藏
    isDisplay: true
  };

  onCollapse = collapsed => {
    const { isDisplay } = this.state;
    console.log(collapsed);
    this.setState({
      collapsed,
      isDisplay: !isDisplay
    });
  };

  render() {
    const { collapsed, isDisplay } = this.state;
    //显示主页内容
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            <h1 style={{ display: isDisplay ? "block" : "none" }}>
            <FormattedMessage id ='title' />
              </h1>
          </div>
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 ,height:80 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: "30px 16px 0 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default  BasicLayout
