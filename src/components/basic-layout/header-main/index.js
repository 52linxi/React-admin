import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
//全屏的方法
import screenfull from "screenfull";
//传送路由三大属性
import { withRouter } from "react-router-dom";
//调用redux方法高阶组件
import { connect } from "react-redux";
//自定义国际化语言的方法
import {injectIntl}from 'react-intl';
//显示时间的插件库
import dayjs from "dayjs";
//引入redux更新语言的方法
import { changeLanguage } from "../../../redux/action";
//引入redux 删除redux数据的方法
import { removeUser } from "../../../redux/action";
//引入less文件
import "./index.less";
//引入locastorage方法删除数据
import { removeItem } from "../../../utils/storage";

//调用自己写的国际化语言的包 提取方法 给组件传递intl方法
@injectIntl
//调用redux的高阶组件
@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
//传递三大属性的高阶组件
@withRouter
class HeaderMain extends Component {
  //定义状态
  state = {
    //初始化全屏状态
    isScreenfull: false,
    //初始化时间
    date: Date.now()
  };

  componentDidMount() {
    //绑定图标变化 触发全屏改变
    screenfull.on("change", this.handleScreenFullChange);
    this.timerId = setInterval(() => {
      this.setState({
        date: Date.now()
      });
    }, 1000);
  }
  // 更新全屏的状态
  handleScreenFullChange = () => {
    this.setState({
      isScreenfull: !this.state.isScreenfull
    });
  };
  //解绑事件 不是react绑定的事件 需要解绑 避免内存泄漏
  componentWillUnmount() {
    screenfull.off("change", this.handleScreenFullChange);
  }
  //绑定点击事件切换全屏
  screenFull = () => {
    screenfull.toggle();
  };

  //退出界面的逻辑
  goout = () => {
    const {intl} = this.props
    //antd的弹窗
    Modal.confirm({
      //标题
      title:intl.formatMessage({id:'goout'}),
      onOk: () => {
        //清除locastorage数据
        removeItem("user");
        //清除redux的数据
        this.props.removeUser();
        //跳转到登录界面
        this.props.history.replace("/login");
      }
    });
  };

  changeLanguage = () => {
    const language = this.props.language === "en" ? "zh-CN" : "en";
    this.props.changeLanguage(language);
  };

  render() {
    //获取isScreenfull方法 判断图标变化
    const { isScreenfull, date } = this.state;
    //获取用户名称
    const { username, language } = this.props;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button
            className="header-main-lang"
            size="small"
            onClick={this.changeLanguage}
          >
            
            {language === "en" ? "中文" : " Endlish"}
          </Button>
          <span>hello,{username} </span>
          <Button size="small" type="link" onClick={this.goout}>
            退出
          </Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">商品管理</span>
          <span className="header-main-right">
            中国时间：{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
      </div>
    );
  }
}
export default HeaderMain;
