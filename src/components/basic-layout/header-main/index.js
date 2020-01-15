import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { removeUser } from "../../../redux/action";
import "./index.less";
import { removeItem } from "../../../utils/storage";

//调用redux的高阶组件
@connect(state => ({ username: state.user.user && state.user.user.username }), {
  removeUser
})
//传递三大属性的高阶组件
@withRouter
class HeaderMain extends Component {
  //定义状态
  state = {
    isScreenfull: false
  };
  //绑定图标变化 触发全屏改变
  componentDidMount() {
    screenfull.on("change", this.handleScreenFullChange);
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
    //antd的弹窗
    Modal.confirm({
      //标题
      title: "你确定要退出界面吗",
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

  render() {
    //获取isScreenfull方法 判断图标变化
    const { isScreenfull } = this.state;
    //获取用户名称
    const { username } = this.props;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button className="header-main-lang" size="small">
            Endlish
          </Button>
          <span>hello,{username} </span>
          <Button size="small" type="link" onClick={this.goout}>
            退出
          </Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">商品管理</span>
          <span className="header-main-rightcc ">中国时间：08：24分</span>
        </div>
      </div>
    );
  }
}
export default HeaderMain;
